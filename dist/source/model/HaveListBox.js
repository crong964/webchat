"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./BaseModel"));
class HaveListBox extends BaseModel_1.default {
    constructor() {
        super();
        this.admin = -2;
        this.idBox = -2;
        this.idUser = 0;
        this.avatar = "";
        this.nameUser = "";
    }
}
exports.default = HaveListBox;
