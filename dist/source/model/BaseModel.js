"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseModel {
    setAll(d) {
        for (const key in this) {
            if (d[key] != undefined) {
                this[key] = d[key];
            }
        }
    }
    json() {
        var s = {};
        for (const key in this) {
            const element = this[key];
            if (element != undefined) {
                s[key] = element;
            }
        }
        return s;
    }
}
exports.default = BaseModel;
