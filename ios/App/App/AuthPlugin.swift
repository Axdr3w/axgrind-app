import Foundation
import UIKit
import Capacitor
import AuthenticationServices

// Two different native sign-in paths live here:
//
// - Apple uses the real ASAuthorizationAppleIDProvider flow (signInWithApple
//   below) — the actual Face ID/Touch ID system sheet, no browser involved
//   at all. It hands back a raw Apple identity token (JWT) that the JS side
//   passes straight to supabase.auth.signInWithIdToken, the same call the
//   website's Apple ID JS popup flow uses — see auth.js.
//
// - Google doesn't have an equivalent same-plugin native option yet (that
//   needs Google's own GoogleSignIn-iOS SDK added as a separate Xcode
//   dependency), so it still goes through openOAuthSession below: Google's
//   OAuth policy actively blocks sign-in from a generic embedded webview
//   (the "disallowed_useragent" error), so the app can't navigate the
//   Capacitor WKWebView to Google's consent screen directly.
//   ASWebAuthenticationSession is Apple's sanctioned system-level browser
//   session for exactly this situation: it runs outside the app's own
//   webview (satisfying Google's policy) and lets us catch the final
//   redirect back to the com.axgrind.app:// scheme without ever handing
//   the OAuth URL to the app's WKWebView.
//
// Same Capacitor runtime constraints as PushPlugin.swift/HealthPlugin.swift
// (precompiled ionic-team/capacitor-swift-pm XCFramework) — every method
// here only ever calls .resolve(), never .reject().
@objc(AuthPlugin)
public class AuthPlugin: CAPPlugin, CAPBridgedPlugin, ASWebAuthenticationPresentationContextProviding, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding {
    public let identifier = "AuthPlugin"
    public let jsName = "AxAuth"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "openOAuthSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "signInWithApple", returnType: CAPPluginReturnPromise)
    ]

    private var session: ASWebAuthenticationSession?
    private var pendingAppleCall: CAPPluginCall?

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

    @objc func signInWithApple(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let provider = ASAuthorizationAppleIDProvider()
            let request = provider.createRequest()
            request.requestedScopes = [.fullName, .email]
            let controller = ASAuthorizationController(authorizationRequests: [request])
            controller.delegate = self
            controller.presentationContextProvider = self
            self.pendingAppleCall = call
            controller.performRequests()
        }
    }

    public func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential,
              let tokenData = credential.identityToken,
              let idToken = String(data: tokenData, encoding: .utf8) else {
            pendingAppleCall?.resolve(["error": "Apple didn't return a usable credential."])
            pendingAppleCall = nil
            return
        }
        pendingAppleCall?.resolve(["idToken": idToken])
        pendingAppleCall = nil
    }

    public func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        pendingAppleCall?.resolve(["error": error.localizedDescription])
        pendingAppleCall = nil
    }

    // self.bridge?.viewController isn't available on this project's actual
    // Capacitor runtime (the precompiled ionic-team/capacitor-swift-pm
    // XCFramework exposes a narrower CAPBridgeProtocol than the npm
    // source's type defs suggest — same mismatch documented in
    // HealthPlugin.swift/PushPlugin.swift) — so get the key window
    // directly instead.
    private func currentKeyWindow() -> ASPresentationAnchor {
        let keyWindow = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }
        return keyWindow ?? ASPresentationAnchor()
    }

    public func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        currentKeyWindow()
    }

    public func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        currentKeyWindow()
    }
}
