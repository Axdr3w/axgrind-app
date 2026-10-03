import Foundation
import UIKit
import Capacitor
import AuthenticationServices

// Native Sign in with Apple: ASAuthorizationAppleIDProvider gives the real
// Face ID/Touch ID system sheet, with no browser involved at all. It hands
// back Apple's signed identity token (a JWT), which the JS side passes
// straight to supabase.auth.signInWithIdToken — the same call the
// website's Apple ID JS popup makes. See src/auth.js.
//
// Same Capacitor runtime constraints as PushPlugin.swift/HealthPlugin.swift
// (precompiled ionic-team/capacitor-swift-pm XCFramework) — every method
// here only ever calls .resolve(), never .reject().
@objc(AuthPlugin)
public class AuthPlugin: CAPPlugin, CAPBridgedPlugin, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding {
    public let identifier = "AuthPlugin"
    public let jsName = "AxAuth"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "signInWithApple", returnType: CAPPluginReturnPromise)
    ]

    private var pendingAppleCall: CAPPluginCall?

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
    public func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        let keyWindow = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }
        return keyWindow ?? ASPresentationAnchor()
    }
}
