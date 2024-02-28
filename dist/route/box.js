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
const CTBox_js_1 = __importDefault(require("../source/controller/CTBox.js"));
const CTHavelistboxchat_js_1 = __importDefault(require("../source/controller/CTHavelistboxchat.js"));
const CTMessage_js_1 = __importDefault(require("../source/controller/CTMessage.js"));
const CThaveLsitFriend_js_1 = __importDefault(require("../source/controller/CThaveLsitFriend.js"));
const CtUsers_js_1 = __importDefault(require("../source/controller/CtUsers.js"));
const Box_js_1 = __importDefault(require("../source/model/Box.js"));
const path_1 = require("path");
var ctHaveListFriends = new CThaveLsitFriend_js_1.default();
var ctBox = new CTBox_js_1.default();
var ctMessage = new CTMessage_js_1.default();
var ctHavelistboxchat = new CTHavelistboxchat_js_1.default();
var ctUer = new CtUsers_js_1.default();
const routeBox = express_1.default.Router();
routeBox.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    yield ctBox.getAllBoxByIdUser(sercurity.id);
    (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, '/font/box/boxlist.ejs'), { listBoxchat: ctBox.lsBox });
}));
routeBox.post("/hiddenBoxChat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idBox = req.body.idBox;
    var check = yield ctHavelistboxchat.hiddenBoxChat(s.id, idBox);
    if (check) {
        res.status(200);
        res.json({ err: false, mess: "thành công ẩn hộp thoại" });
        return;
    }
    res.json({ err: true, mess: "có lỗi" });
}));
routeBox.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let s = req.cookies;
    var idFriend = req.body.idFriend;
    if (s.id == idFriend) {
        res.json({ err: true, mess: "bạn ko thể chat cho mình" });
        return;
    }
    let user = yield ctUer.GetUserById(idFriend);
    if (!user) {
        res.json({ err: true, mess: "không có người này" });
        return;
    }
    let box = new Box_js_1.default();
    var li = yield ctHavelistboxchat.GetIdBoxbyIdUserAndIdFriend(s.id, idFriend);
    if (li.length > 0) {
        // có hộp thoại giữa hai người
        box.setAll(li[0]);
        let listMess = yield ctMessage.GetAllContentByidBox(box.idBox, s.id);
        var now;
        if (listMess.length > 0) {
            now = listMess[listMess.length - 1].ngay;
        }
        (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, 'font/box/boxchat.ejs'), {
            box: box.json(),
            listMess: listMess,
            id: s.id,
            idFriend: idFriend,
            now: now
        });
        return;
    }
    //chưa có hộp thoại giữa hai người
    yield ctBox.insertNewBox("friend");
    let isFriend = "";
    yield Promise.all([ctBox.GetEmptyBox(), ctHaveListFriends.IsFriendInList(s.id, idFriend)])
        .then((v) => {
        li = v[0];
        isFriend = v[1] ? ctBox.gettype().Friend : ctBox.gettype().noFriend;
    })
        .catch((v) => {
        li = [];
        console.log(v);
    });
    if (li.length <= 0) {
        res.json({ err: true, mess: "ko có box chat rỗng" });
        return;
    }
    box = li[0];
    yield Promise.all([
        ctHavelistboxchat.InsertIdToNewBox(s.id, box.idBox, idFriend),
        ctBox.UpdateBoxType(box.idBox, isFriend),
        ctHavelistboxchat.InsertIdToNewBox(idFriend, box.idBox, idFriend)
    ]);
    (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, 'font/box/boxchat.ejs'), {
        box: box.json(), idFriend: idFriend, id: s.id,
        now: (0, confi_js_1.formatNowDateYMDHMS)(Date.now().toString()),
        listMess: []
    });
}));
routeBox.get("/addGroup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var lis = yield ctHaveListFriends.GetHaveListFriendsByIdUser(s.id);
    (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, 'font/box/addboxgroup.ejs'), { l: lis });
}));
routeBox.post("/addGroup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var ls = req.body.ls;
    ls.push(s.id);
    if (ls.length < 2) {
        res.json({
            err: true
        });
        return;
    }
    var insertId = yield ctBox.insertNewBox("group");
    var havels = ls.map((v) => __awaiter(void 0, void 0, void 0, function* () {
        if (v == s.id) {
            return yield ctHavelistboxchat.InsertIdToNewBox(v, insertId, v, "1");
        }
        return yield ctHavelistboxchat.InsertIdToNewBox(v, insertId, v);
    }));
    var check = yield Promise.all(havels);
    res.json({
        err: false
    });
}));
exports.default = routeBox;
