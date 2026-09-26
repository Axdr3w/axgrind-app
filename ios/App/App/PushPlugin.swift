import Foundation
import Capacitor
import UserNotifications

// Web Push (navigator.serviceWorker/PushManager) cannot work inside a
// Capacitor WKWebView on iOS — there's no Service Worker support at all in
// that context, confirmed still true as of iOS's current state. Real push
// on the native app requires APNs, which means a native plugin: same
// reasoning and constraints as HealthPlugin.swift (this project's actual
// Capacitor runtime is the precompiled ionic-team/capacitor-swift-pm
// XCFramework, not the source npm package, so CAPPluginCall.reject() and
// the optional-returning getString/getDouble overloads are unusable here —
// every method below only ever calls .resolve()).
//
// The device token arrives asynchronously in AppDelegate (didRegisterFor-
// RemoteNotificationsWithDeviceToken), not synchronously from a plugin
// call, so AppDelegate posts an NSNotification this plugin listens for and
// re-fires as a JS-facing "registration" event — mirroring the event shape
// @capacitor/push-notifications uses, so the JS side reads naturally even
// though this is our own plugin, not that package.
extension Notification.Name {
    static let axPushDidRegister = Notification.Name("axPushDidRegister")
    static let axPushDidFailToRegister = Notification.Name("axPushDidFailToRegister")
}

@objc(PushPlugin)
public class PushPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "PushPlugin"
    public let jsName = "AxPush"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "requestPermission", returnType: CAPPluginReturnPromise)
    ]

    public override func load() {
        NotificationCenter.default.addObserver(self, selector: #selector(onRegister(_:)), name: .axPushDidRegister, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(onFailToRegister(_:)), name: .axPushDidFailToRegister, object: nil)
    }

    @objc func requestPermission(_ call: CAPPluginCall) {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            if granted {
                DispatchQueue.main.async {
                    UIApplication.shared.registerForRemoteNotifications()
                }
            }
            call.resolve(["granted": granted, "error": error?.localizedDescription ?? NSNull()])
        }
    }

    @objc private func onRegister(_ notification: Notification) {
        let token = notification.userInfo?["token"] as? String ?? ""
        notifyListeners("registration", data: ["token": token])
    }

    @objc private func onFailToRegister(_ notification: Notification) {
        let message = notification.userInfo?["error"] as? String ?? "Unknown error"
        notifyListeners("registrationError", data: ["error": message])
    }
}
