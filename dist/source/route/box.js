var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import CTBox from "../source/controller/CTBox.js";
import CTHavelistboxchat from "../source/controller/CTHavelistboxchat.js";
import CTMessage from "../source/controller/CTMessage.js";
import CTHaveListFriends from "../source/controller/CThaveLsitFriend.js";
import CtUer from "../source/controller/CtUsers.js";
var ctHaveListFriends = new CTHaveListFriends();
var ctBox = new CTBox();
var ctMessage = new CTMessage();
var ctHavelistboxchat = new CTHavelistboxchat();
var ctUer = new CtUer();
const routeBox = express.Router();
routeBox.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    yield ctBox.getAllBoxByIdUser(sercurity.id);
    res.json({
        listBoxchat: ctBox.lsBox,
    });
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
    let idFriend = req.body.idFriend;
    if (s.id == idFriend) {
        res.json({ err: true, mess: "bạn ko thể chat cho mình" });
        return;
    }
    let user = yield ctUer.GetUserById(idFriend);
    if (!user) {
        res.json({ err: true, mess: "không có người này" });
        return;
    }
    let box;
    var li = yield ctHavelistboxchat.GetIdBoxbyIdUserAndIdFriend(s.id, idFriend);
    if (li.length > 0) {
        box = li[0];
        let listMess = yield ctMessage.GetAllContentByidBox(box.idBox, s.id);
        res.json({
            box: box.json(),
            listMess: listMess
        });
        return;
    }
    yield ctBox.insertNewBox();
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
        ctHavelistboxchat.InsertIdToNewBox(s.id, box.idBox),
        ctBox.UpdateBoxType(box.idBox, isFriend),
        ctHavelistboxchat.InsertIdToNewBox(idFriend, box.idBox)
    ]);
    res.json({ err: false, box: box.json() });
}));
export default routeBox;
