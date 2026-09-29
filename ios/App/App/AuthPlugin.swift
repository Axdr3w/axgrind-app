import Foundation
import UIKit
import Capacitor
import AuthenticationServices

// Google's OAuth policy actively blocks sign-in when it detects the
// request coming from a generic embedded webview (the "disallowed_
// useragent" error) — so the app can't just navigate the Capacitor
// WKWebView to Google's (or Apple's) consent screen the way the plain
// website does. ASWebAuthenticationSession is Apple's sanctioned
// system-level browser session for exactly this situation: it runs
// outside the app's own webview (satisfying Google's policy) and lets us
// catch the final redirect back to the com.axgrind.app:// scheme without
// ever handing the OAuth URL to the app's WKWebView. See auth.js's
// signInWithOAuth for the JS side of this handshake.
//
// Same Capacitor runtime constraints as PushPlugin.swift/HealthPlugin.swift
// (precompiled ionic-team/capacitor-swift-pm XCFramework) — every method
// here only ever calls .resolve(), never .reject().
@objc(AuthPlugin)
public class AuthPlugin: CAPPlugin, CAPBridgedPlugin, ASWebAuthenticationPresentationContextProviding {
    public let identifier = "AuthPlugin"
    public let jsName = "AxAuth"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "openOAuthSession", returnType: CAPPluginReturnPromise)
    ]

    private var session: ASWebAuthenticationSession?

    @objc func openOAuthSession(_ call: CAPPluginCall) {
        let urlString = call.getString("url", "")
        let scheme = call.getString("callbackScheme", "com.axgrind.app")
        guard let url = URL(string: urlString) else {
            call.resolve(["error": "Invalid sign-in URL."])
            return
        }

        DispatchQueue.main.async {
            let authSession = ASWebAuthenticationSession(url: url, callbackURLScheme: scheme) { callbackURL, error in
                if let callbackURL = callbackURL {
                    call.resolve(["url": callbackURL.absoluteString])
                } else {
                    call.resolve(["error": error?.localizedDescription ?? "Sign-in was cancelled."])
                }
            }
            authSession.presentationContextProvider = self
            authSession.prefersEphemeralWebBrowserSession = false
            self.session = authSession
            authSession.start()
        }
    }

    // self.bridge?.viewController isn't available on this project's actual
    // Capacitor runtime (the precompiled ionic-team/capacitor-swift-pm
    // XCFramework exposes a narrower CAPBridgeProtocol than the npm
    // source's type defs suggest — same mismatch documented in
    // HealthPlugin.swift/PushPlugin.swift) — so get the key window
    // directly instead.
    public func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        let keyWindow = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }
        return keyWindow ?? ASPresentationAnchor()
    }
}
