"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.PaymentMethod = void 0;
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["VISA"] = "VISA";
    PaymentMethod["MASTER"] = "MASTER";
    PaymentMethod["MADA"] = "MADA";
    PaymentMethod["APPLE"] = "APPLE";
    PaymentMethod["ANDROID"] = "ANDROID";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Paid"] = "Paid";
    PaymentStatus["Wait"] = "Wait";
    PaymentStatus["Fail"] = "Fail";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
//# sourceMappingURL=payment-method.enum.js.map