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
const confi_js_1 = require("../confi.js");
const server_1 = __importDefault(require("../server"));
const CTMessage_js_1 = __importDefault(require("../source/controller/CTMessage.js"));
const CTHavelistboxchat_js_1 = __importDefault(require("../source/controller/CTHavelistboxchat.js"));
const Ctvalidateuser_js_1 = __importDefault(require("../source/controller/Ctvalidateuser.js"));
const CTBox_js_1 = __importDefault(require("../source/controller/CTBox.js"));
const CtUsers_js_1 = __importDefault(require("../source/controller/CtUsers.js"));
const CTAddFriendReques_js_1 = __importDefault(require("../source/controller/CTAddFriendReques.js"));
const routeMap = (0, express_1.Router)();
var ctmessage = new CTMessage_js_1.default();
var cthavelistboxchat = new CTHavelistboxchat_js_1.default();
var ctvalidateuser = new Ctvalidateuser_js_1.default();
var ctbox = new CTBox_js_1.default();
var ctuser = new CtUsers_js_1.default();
var ctAddFriendReques = new CTAddFriendReques_js_1.default();
routeMap.post("/subscribe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var cookie = req.cookies;
    const data = req.body;
    console.log(req.body);
    var idBox = req.body.idbox;
    var list = yield cthavelistboxchat.GetIdUserOnlineInBox(cookie.id, idBox);
    var s = (new Date()).toDateString();
    var ngay = (0, confi_js_1.formatNowDateYMDHMS)(s);
    var uuid;
    if (data.type == "shareLocation") {
        //https://api.tomtom.com/map/1/staticimage?key=NcCz24AQhyNMZ4h7LAudoLDGBatHcRnb&center=106.8849,10.907
        var content = `chia sẻ vị trí_${data.lng}_${data.lat}`;
        try {
            uuid = yield (0, confi_js_1.GetImageFromTomTom)(data.lng, data.lat);
            content = `${uuid}_${data.lng}_${data.lat}`;
        }
        catch (error) {
            console.log(error);
        }
        console.log(content);
        let v = yield Promise.all([
            cthavelistboxchat.visualBoxChat(cookie.id, idBox),
            cthavelistboxchat.SetNotSeenInBox(cookie.id, idBox),
            ctmessage.InsertContentIn(idBox, cookie.id, content, "3"),
            ctbox.UpdateLastMessBox(cookie.id, content, idBox, "shareLocation")
        ]);
        list.forEach((id) => {
            server_1.default.in(id.idUser + "").emit("receiveMess", { idMess: v[2].insertId, idFriend: cookie.id, idBox: idBox, content: content, type: "3", ngay: ngay });
        });
        res.json({
            err: false,
            mess: "xong"
        });
        return;
    }
    var tg = new Date();
    res.cookie("end", tg.getTime() + 15 * 60 * 1000, {
        httpOnly: true,
    });
    res.cookie("idBox", idBox, {
        httpOnly: true,
    });
    var hashData = (0, confi_js_1.hash)(cookie.id + cookie.sercurity + idBox, 10);
    res.cookie("hash", hashData, {
        httpOnly: true,
    });
    let v = yield Promise.all([
        cthavelistboxchat.visualBoxChat(cookie.id, idBox),
        cthavelistboxchat.SetNotSeenInBox(cookie.id, idBox),
        ctmessage.InsertContentIn(idBox, cookie.id, "chia sẻ vị trí trực tiếp", "2"),
        ctbox.UpdateLastMessBox(cookie.id, "chia sẻ vị trí trực tiếp", idBox, "liveLocation")
    ]);
    list.forEach((id) => {
        server_1.default.in(id.idUser + "").emit("receiveMess", { idMess: v[2].insertId, idFriend: cookie.id, idBox: idBox, content: "chia sẻ vị trí trực tiếp", type: "2", ngay: ngay });
    });
    server_1.default.to(cookie.id + "").emit("liveLocation", {
        data: true
    });
    res.json({
        err: false
    });
}));
routeMap.post("/shareLoction", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var cookie = req.cookies;
    var hashData = (0, confi_js_1.hash)(cookie.id + cookie.sercurity + cookie.idBox, 10);
    if (cookie.hash != hashData) {
        res.json({
            err: false
        });
        return;
    }
    var list = yield cthavelistboxchat.GetIdUserOnlineInBox(cookie.id, cookie.idBox);
    list.forEach((id) => {
        if ((id.idUser + "") != cookie.id) {
            server_1.default.in(id.idUser + "").emit("receiveYourLocation", { lng: req.body.lng, lat: req.body.lat, idFriend: id.idUser });
        }
    });
    res.json({
        err: false
    });
}));
routeMap.post("/stopShareLoction", (req, res) => {
    var cookie = req.cookies;
    server_1.default.to(cookie.id + "").emit("stopShareLoction");
    res.clearCookie("end");
    res.clearCookie("idBox");
    res.clearCookie("hash");
    res.json({
        err: false
    });
});
exports.default = routeMap;
