"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const confi_js_1 = __importStar(require("../confi.js"));
const CTMessage_js_1 = __importDefault(require("../source/controller/CTMessage.js"));
const CTHavelistboxchat_js_1 = __importDefault(require("../source/controller/CTHavelistboxchat.js"));
const CtUsers_js_1 = __importDefault(require("../source/controller/CtUsers.js"));
const Box_js_1 = __importDefault(require("../source/model/Box.js"));
const path_1 = require("path");
const CTHiddenMess_js_1 = require("../source/controller/CTHiddenMess.js");
const fs_1 = require("fs");
var ctMessage = new CTMessage_js_1.default();
var ctHavelistboxchat = new CTHavelistboxchat_js_1.default();
var ctHiddenMess = new CTHiddenMess_js_1.CTHiddenMess();
var ctuser = new CtUsers_js_1.default();
const routeMess = express_1.default.Router();
routeMess.post("/getAllContent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idBox = req.body.idBox;
    ctHavelistboxchat.visualBoxChat(s.id, idBox);
    var now = req.body.now;
    var idFriend = req.body.idFriend;
    var exl = yield Promise.all([
        ctHavelistboxchat.GetHaveListidBoxByIdUser(s.id, idBox),
        ctHavelistboxchat.GetIdBoxbyIdUserAndIdFriend(s.id, idFriend),
        ctMessage.GetAllContentByidBox(idBox, s.id, now)
    ]);
    var hb = exl[0];
    var li = exl[1];
    let listMess = exl[2];
    var box = new Box_js_1.default();
    if (listMess.length > 0) {
        now = listMess[listMess.length - 1].ngay;
    }
    else {
        now = "-1";
    }
    if (li.length > 0) {
        box.setAll(li[0]);
        (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, 'font/box/boxchat.ejs'), {
            box: box.json(),
            permission: hb === null || hb === void 0 ? void 0 : hb.admin,
            listMess: listMess,
            id: s.id,
            idFriend: idFriend,
            now: now
        });
        return;
    }
    res.end();
}));
routeMess.post("/getContentSCroll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idBox = req.body.idBox;
    var now = req.body.now;
    var idFriend = req.body.idFriend;
    var li = yield ctHavelistboxchat.GetIdBoxbyIdUserAndIdFriend(s.id, idFriend);
    let listMess = yield ctMessage.GetAllContentByidBox(idBox, s.id, now);
    var box = new Box_js_1.default();
    if (listMess.length > 0) {
        now = listMess[listMess.length - 1].ngay;
    }
    else {
        now = "-1";
    }
    if (li.length > 0) {
        box.setAll(li[0]);
        setTimeout(() => {
            (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, 'font/mess/listMess.ejs'), {
                box: box.json(),
                listMess: listMess,
                id: s.id,
                idFriend: idFriend,
                now: now
            });
        }, 1);
        return;
    }
    res.end();
}));
routeMess.post("/remove", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var idmess = req.body.idMess;
    var s = req.cookies;
    var f = yield ctMessage.GetMessById(idmess);
    var iduser = s.id;
    if (f == undefined) {
        res.json({
            err: true,
        });
        return;
    }
    if (iduser == (f.idUser + "")) {
        yield Promise.all([ctHiddenMess.DelHiddenMess(idmess), ctMessage.DelMessById(idmess, iduser)]);
        if (f.type == "1") {
            f.content.split(" ").forEach((v) => {
                console.log((0, path_1.join)(confi_js_1.default, 'public/upload', v));
                if (v == "") {
                    return;
                }
                (0, fs_1.unlink)((0, path_1.join)(confi_js_1.default, 'public/upload', v), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            });
        }
        res.json({
            err: false,
        });
        return;
    }
    ctHiddenMess.InsertHiddenmess(idmess, iduser);
    res.json({
        err: false,
    });
}));
routeMess.post("/hiddenMess", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var idMess = req.body.idMess;
    var user = req.cookies;
    if (idMess == undefined) {
        res.json({});
        return;
    }
    var data = yield ctHiddenMess.GetHiddenMessByidMessidUser(idMess, user.id);
    if (data) {
        res.json({ err: true });
        return;
    }
    ctHiddenMess.InsertHiddenmess(idMess, user.id);
    res.json({ err: false });
}));
routeMess.post("/imageMess", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idBox = req.body.idbox;
    var start = req.body.start | 0;
    var list = yield ctMessage.GetImageMessByidBox(idBox, s.id, { start: start, cout: 4 });
}));
exports.default = routeMess;
