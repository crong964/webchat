"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const confi_1 = require("../confi");
const CtUsers_1 = __importDefault(require("../source/controller/CtUsers"));
const User_1 = __importDefault(require("../source/model/User"));
var ctuser = new CtUsers_1.default();
const user = express_1.default.Router();
user.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var u = yield ctuser.GetUserById(s.id);
    (0, confi_1.renderHtml)(res, "", u, "json");
}));
user.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var birthday = req.body.birthday;
    var sex = req.body.sex;
    var nameUser = req.body.nameUser;
    var p = new User_1.default();
    p.birthday = birthday;
    p.id = parseInt(s.id + "");
    p.sex = sex;
    p.nameUser = nameUser;
    var u = yield ctuser.UpdateUser(p);
    res.json({
        err: !u
    });
}));
exports.default = user;
