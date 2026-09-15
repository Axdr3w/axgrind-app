import UIKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = CAPBridgeViewController()
        window?.makeKeyAndVisible()

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)

        // Cold launch from a Universal Link (e.g. a tapped magic-link email):
        // give the webview a moment to finish loading before handing it the URL.
        if let userActivity = connectionOptions.userActivities.first {
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) { [weak self] in
                self?.handleUniversalLink(userActivity)
            }
        }
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
        handleUniversalLink(userActivity)
    }

    // A tapped Universal Link (like a Supabase magic-link email) doesn't
    // reach the webview's JS on its own — hand it off to window.__handleUniversalLink
    // (defined in src/main.js) so the auth tokens in the URL can be picked up.
    private func handleUniversalLink(_ userActivity: NSUserActivity) {
        guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
              let url = userActivity.webpageURL,
              let bridgeVC = window?.rootViewController as? CAPBridgeViewController,
              let jsonData = try? JSONEncoder().encode(url.absoluteString),
              let jsString = String(data: jsonData, encoding: .utf8) else { return }

        let js = "window.__handleUniversalLink && window.__handleUniversalLink(\(jsString));"
        bridgeVC.webView?.evaluateJavaScript(js, completionHandler: nil)
    }
}
