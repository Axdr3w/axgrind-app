import Foundation
import Capacitor
import HealthKit

// Custom-written instead of using a third-party Health plugin — every
// candidate (@capgo/capacitor-health, capacitor-health) fails to compile
// against this project's exact Capacitor SPM binary (8.5.0): its
// CAPPluginCall.reject(...) is real but compiled behind
// `#if compiler(>=5.3) && $NonescapableTypes`, an experimental Swift
// feature this project doesn't enable — an upstream packaging issue in
// Ionic's binary release, not something fixable from this project's side
// without turning on an unrelated unstable compiler flag. Every method
// below only ever calls resolve() — never reject() — specifically to avoid
// that gap. This is the same "write the native bridge directly instead of
// fighting a broken plugin" approach already used for Universal Links in
// SceneDelegate.swift.
@objc(HealthPlugin)
public class HealthPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "HealthPlugin"
    public let jsName = "Health"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isAvailable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestAuthorization", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "readLatestWeight", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "saveWeight", returnType: CAPPluginReturnPromise)
    ]

    private let store = HKHealthStore()
    private let weightType = HKQuantityType.quantityType(forIdentifier: .bodyMass)!

    @objc func isAvailable(_ call: CAPPluginCall) {
        call.resolve(["available": HKHealthStore.isHealthDataAvailable()])
    }

    @objc func requestAuthorization(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable() else {
            call.resolve(["success": false, "error": "Health data is not available on this device."])
            return
        }
        store.requestAuthorization(toShare: [weightType], read: [weightType]) { success, error in
            call.resolve(["success": success, "error": error?.localizedDescription ?? NSNull()])
        }
    }

    @objc func readLatestWeight(_ call: CAPPluginCall) {
        let sort = NSSortDescriptor(key: HKSampleSortIdentifierEndDate, ascending: false)
        let query = HKSampleQuery(sampleType: weightType, predicate: nil, limit: 1, sortDescriptors: [sort]) { _, samples, error in
            if let error = error {
                call.resolve(["success": false, "error": error.localizedDescription])
                return
            }
            guard let sample = samples?.first as? HKQuantitySample else {
                call.resolve(["success": true, "sample": NSNull()])
                return
            }
            let pounds = sample.quantity.doubleValue(for: .pound())
            let formatter = ISO8601DateFormatter()
            call.resolve([
                "success": true,
                "sample": [
                    "weight": pounds,
                    "date": formatter.string(from: sample.endDate)
                ]
            ])
        }
        store.execute(query)
    }

    @objc func saveWeight(_ call: CAPPluginCall) {
        // This binary's optional-returning getDouble(_:)/getString(_:) overloads
        // are gated behind the same unavailable compiler flag as reject() (see
        // the file header) — only the default-value-requiring overloads exist
        // here, so a sentinel stands in for "not provided" instead of nil.
        let pounds = call.getDouble("weight", -1)
        guard pounds > 0 else {
            call.resolve(["success": false, "error": "weight is required."])
            return
        }
        let dateString = call.getString("date", "")
        let date = dateString.isEmpty ? Date() : (ISO8601DateFormatter().date(from: dateString) ?? Date())
        let quantity = HKQuantity(unit: .pound(), doubleValue: pounds)
        let sample = HKQuantitySample(type: weightType, quantity: quantity, start: date, end: date)
        store.save(sample) { success, error in
            call.resolve(["success": success, "error": error?.localizedDescription ?? NSNull()])
        }
    }
}
