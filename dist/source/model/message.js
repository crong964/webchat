"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeMess = void 0;
const confi_js_1 = require("../../confi.js");
var typeMess;
(function (typeMess) {
    typeMess["content"] = "0";
    typeMess["image"] = "1";
})(typeMess || (exports.typeMess = typeMess = {}));
class message {
    constructor() {
        this.idBox = "";
        this.idUser = 0;
        this.content = "";
        this.type = typeMess.content;
        this.idMess = 0;
        this.ngay = "";
    }
    setAll(d) {
        for (const key in this) {
            this[key] = d[key];
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
        if (s["ngay"]) {
            s["ngay"] = (0, confi_js_1.formatNowDateYMDHMS)(s["ngay"]);
        }
        return s;
    }
}
exports.default = message;
