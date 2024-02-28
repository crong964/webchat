"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Box {
    constructor() {
        this.idBox = "";
        this.imagebox = "";
        this.boxtype = 0;
        this.idUser = 0;
        this.nameUser = "";
        this.avatar = "";
        this.id = 0;
        this.content = "";
        this.messType = "mess";
        this.status = 1;
    }
    setAll(p) {
        for (const key in this) {
            this[key] = p[key];
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
exports.default = Box;
