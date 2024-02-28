"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_js_1 = __importDefault(require("./User.js"));
class HaveListFriends extends User_js_1.default {
    constructor() {
        super();
    }
    json() {
        return super.json();
    }
    setAll(d) {
        super.setAll(d);
    }
}
exports.default = HaveListFriends;
