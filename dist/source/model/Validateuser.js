"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var status;
(function (status) {
    status[status["offline"] = 0] = "offline";
    status[status["online"] = 1] = "online";
})(status || (status = {}));
class Validateuser {
    constructor() {
        this.time = 0;
        this.id = 0;
        this.cookie = "";
        this.socket = "";
        this.status = 1;
        this.ab = "";
    }
    setAll(p) {
        for (const key in this) {
            this[key] = p[key];
        }
    }
    Json() {
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
exports.default = Validateuser;
