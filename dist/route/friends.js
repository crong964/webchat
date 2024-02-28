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
const CTAddFriendReques_js_1 = __importDefault(require("../source/controller/CTAddFriendReques.js"));
const CThaveLsitFriend_js_1 = __importDefault(require("../source/controller/CThaveLsitFriend.js"));
const CtUsers_js_1 = __importDefault(require("../source/controller/CtUsers.js"));
const CTHavelistboxchat_js_1 = __importDefault(require("../source/controller/CTHavelistboxchat.js"));
const CTBox_js_1 = __importDefault(require("../source/controller/CTBox.js"));
const server_js_1 = __importDefault(require("../server.js"));
const path_1 = require("path");
var cthaveLsitFriend = new CThaveLsitFriend_js_1.default();
var ctAddFriendReques = new CTAddFriendReques_js_1.default();
var ctHavelistboxchat = new CTHavelistboxchat_js_1.default();
var ctUser = new CtUsers_js_1.default();
var ctBox = new CTBox_js_1.default();
const routeFriends = express_1.default.Router();
routeFriends.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    yield cthaveLsitFriend
        .GetHaveListFriendsByIdUser(sercurity.id)
        .catch((v) => { });
    var l = cthaveLsitFriend.HaveListFriends;
    (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, '/font/friendlist.ejs'), { l: l });
}));
routeFriends.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var nameUser = req.body.name;
    var s = req.cookies;
    var haveListFriends = [];
    yield Promise.all([
        cthaveLsitFriend.SearchFirendsByName(s.id, nameUser),
    ])
        .then((v) => {
        haveListFriends = v[0];
    })
        .catch((v) => {
        console.log(v);
    });
    (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, '/font/friend.ejs'), {
        listFriends: haveListFriends
    });
}));
routeFriends.get("/searchuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, '/font/user/adduser.ejs'), {});
}));
routeFriends.post("/searchuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var nameUser = req.body.nameUser;
    var s = req.cookies;
    var listUser = [];
    listUser = yield ctUser.SearchListUserByName(s.id, nameUser);
    (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, '/font/user/userlist.ejs'), {
        listUser: listUser
    });
}));
routeFriends.post("/addFriendsRequset", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idFriend = req.body.idFriend;
    if (s.id === idFriend) {
        res.json({ err: true, mess: "bạn không thể kết bạn với mình" });
        return;
    }
    var check = false;
    yield Promise.all([
        cthaveLsitFriend.IsFriendInList(s.id, idFriend),
        ctAddFriendReques.InAddFriendRequest(s.id, idFriend),
        ctAddFriendReques.InAddFriendRequest(idFriend, s.id),
    ])
        .then((v) => {
        if (v[0] || v[1] || v[2]) {
            check = true;
        }
        else {
            check = false;
        }
    })
        .catch((v) => {
        check = true;
    });
    if (check) {
        res.json({ err: true, mess: "là bạn bè rui hoặc có gửi lời kết bạn" });
        return;
    }
    var check = yield ctAddFriendReques.InsertAddFriendRequest(s.id, idFriend);
    if (check) {
        server_js_1.default.to(idFriend).emit("ReqAddFriends", "yêu cầu kết bạn");
    }
    res.json({ err: true, mess: "bạn đã giử thành công" });
}));
routeFriends.post("/listAddFriendRequest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var list = yield Promise.all([ctAddFriendReques.ListAddFriendRequest(s.id), ctAddFriendReques.UpdateFriendRequestBySeen(s.id)]);
    (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, '/font/addfriendlist.ejs'), {
        listUser: list[0], n: list[0].length
    });
}));
routeFriends.post("/cacelAddFriendRequest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let s = req.body.idFriend;
    let sercurity = req.cookies;
    var status = yield ctAddFriendReques.CancelingFriendRequest(s, sercurity.id);
    res.json({ err: status });
}));
routeFriends.post("/acceptAddFriendRequest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var idFriend = req.body.idFriend;
    var s = req.cookies;
    var check = yield ctAddFriendReques.InAddFriendRequest(idFriend, s.id);
    if (!check) {
        res.json({ err: true, mess: "bạn đó chưa giử lời kết bạn" });
        return;
    }
    yield Promise.all([
        ctAddFriendReques.CancelingFriendRequest(idFriend, s.id),
        cthaveLsitFriend.insertListFriends(s.id, idFriend),
        cthaveLsitFriend.insertListFriends(idFriend, s.id),
    ])
        .catch((v) => {
        check = false;
    })
        .then((v) => {
        check = true;
    });
    res.json({ err: false, mess: "thêm bạn thành công" });
}));
routeFriends.post("/cancelFriends", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var idFriend = req.body.idFriend;
    var idBox = yield ctHavelistboxchat.GetIdBoxbyIdUserAndIdFriend(s.id, idFriend);
    yield Promise.all([
        cthaveLsitFriend.CancelFriends(s.id, idFriend),
        cthaveLsitFriend.CancelFriends(idFriend, s.id),
    ]);
    if (idBox.length > 0) {
        yield ctBox.UpdateBoxType(idBox[0].idBox, ctBox.gettype().noFriend);
    }
    res.json({ err: false });
}));
routeFriends.post("/sentFriendRequest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    let listAddFriendRequest = yield ctAddFriendReques.ListSentFriendRequest(s.id);
    res.json({ err: false, list: listAddFriendRequest });
}));
exports.default = routeFriends;
