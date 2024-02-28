"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_js_1 = __importDefault(require("./BaseModel.js"));
class HiddenMess extends BaseModel_js_1.default {
    constructor() {
        super();
        this.idUser = "";
        this.idMess = "";
    }
}
exports.default = HiddenMess;
