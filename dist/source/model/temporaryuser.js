"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_js_1 = __importDefault(require("./User.js"));
class temporaryuser extends User_js_1.default {
    constructor() {
        super();
        this.valiCode = "";
        this.password = "";
        this.CreatedTime = new Date();
    }
    setAll(d) {
        super.setAll(d);
    }
    json() {
        return super.json();
    }
}
exports.default = temporaryuser;
