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
const express_1 = require("express");
const CTBox_js_1 = __importDefault(require("../source/controller/CTBox.js"));
const CTHavelistboxchat_js_1 = __importDefault(require("../source/controller/CTHavelistboxchat.js"));
const CTMessage_js_1 = __importDefault(require("../source/controller/CTMessage.js"));
const CThaveLsitFriend_js_1 = __importDefault(require("../source/controller/CThaveLsitFriend.js"));
const CtUsers_js_1 = __importDefault(require("../source/controller/CtUsers.js"));
const HaveListBox_js_1 = __importDefault(require("../source/model/HaveListBox.js"));
var ctHaveListFriends = new CThaveLsitFriend_js_1.default();
var ctBox = new CTBox_js_1.default();
var ctMessage = new CTMessage_js_1.default();
var ctHavelistboxchat = new CTHavelistboxchat_js_1.default();
var ctUer = new CtUsers_js_1.default();
const routeGroupBox = (0, express_1.Router)();
routeGroupBox.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var box = yield ctBox.GetBoxbyIdBox(req.body.idBox);
    if ((box === null || box === void 0 ? void 0 : box.boxtype) == 2) {
        next();
        return;
    }
    res.json({
        err: true
    });
}));
routeGroupBox.post("/kickMember", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idBox = req.body.idBox;
    var idMem = req.body.idMem;
    var exl = yield Promise.all([ctHavelistboxchat.GetHaveListidBoxByIdUser(s.id, idBox), ctHavelistboxchat.GetHaveListidBoxByIdUser(idMem, idBox)]);
    var hb = exl[0]; //nguời đuổi
    var hbMen = exl[1]; // người bị đuổi
    if (!hb || !hbMen || hb.admin <= 0) {
        res.json({
            err: true
        });
        return;
    }
    if (hb.admin == 1 && (hbMen.admin == 2 || hbMen.admin == 0)) {
        yield ctHavelistboxchat.DeleteMenberInGroup(idMem, idBox);
        res.json({
            err: false
        });
        return;
    }
    res.json({
        err: true
    });
}));
routeGroupBox.post("/upLevel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idBox = req.body.idBox;
    var idMem = req.body.idMem;
    var exl = yield Promise.all([ctHavelistboxchat.GetHaveListidBoxByIdUser(s.id, idBox), ctHavelistboxchat.GetHaveListidBoxByIdUser(idMem, idBox)]);
    var hb = exl[0]; //nguời đuổi
    var hbMen = exl[1]; // người bị đuổi
    if (!hb || !hbMen || hb.admin <= 0) {
        res.json({
            err: true
        });
        return;
    }
    if (hb.admin == 1 && hbMen.admin == 0) {
        ctHavelistboxchat.UpLevelMenberInGroup(idMem, idBox);
        res.json({
            err: false
        });
        return;
    }
    res.json({
        err: true
    });
}));
routeGroupBox.post("/addMenber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    var s = req.cookies;
    var idBox = req.body.idBox;
    var idMem = req.body.idMem;
    var hb = yield ctHavelistboxchat.GetHaveListidBoxByIdUser(s.id, idBox);
    if (!hb || hb.admin <= 0) {
        res.json({
            err: true
        });
        return;
    }
    hb = yield ctHavelistboxchat.GetHaveListidBoxByIdUser(idMem, idBox);
    console.log(hb);
    if (!hb) {
        yield ctHavelistboxchat.InsertIdToNewBox(idMem, idBox, idMem);
    }
    res.json({
        err: false
    });
}));
routeGroupBox.post("/getAllMenberInChatGroup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idBox = req.body.idBox;
    var hb = yield ctHavelistboxchat.GetHaveListidBoxByIdUser(s.id, idBox);
    if (!hb) {
        res.json({
            err: true
        });
        return;
    }
    var ls = yield ctHavelistboxchat.GetAllMenberInChatGroup(s.id, idBox);
    res.json({
        err: false,
        ls: ls,
        admin: hb.admin
    });
}));
routeGroupBox.post("/recommanFriendList", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idBox = req.body.idBox;
    var exl = yield Promise.all([ctHavelistboxchat.GetAllMenberInChatGroup(s.id, idBox),
        ctHaveListFriends.GetHaveListFriendsByIdUser(s.id)]);
    // f   h
    // 1 
    // 2   2
    // 3   4
    // 4   6
    // 5   7
    // 6   8
    // 7   
    // 8   
    // 10
    // 11
    var hb = exl[0];
    var friends = exl[1];
    var temp = [];
    var j = 0;
    for (let i = 0; i < friends.length; i++) {
        const e = friends[i];
        while (e.id > hb[j].idUser && j < hb.length) {
            j += 1;
        }
        if (hb[j].idUser != e.id) {
            var t = new HaveListBox_js_1.default();
            t.setAll(e);
            t.idUser = e.id;
            temp.push(t);
        }
        else {
            var t = new HaveListBox_js_1.default();
            t.setAll(hb[j]);
            t.idBox = 2;
            temp.push(t);
        }
    }
    res.json({
        ls: temp,
        err: false
    });
}));
exports.default = routeGroupBox;
