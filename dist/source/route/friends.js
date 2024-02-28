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
import CTAddFriendReques from "../source/controller/CTAddFriendReques.js";
import CTHaveListFriends from "../source/controller/CThaveLsitFriend.js";
import CTUsers from "../source/controller/CtUsers.js";
import CTHavelistboxchat from "../source/controller/CTHavelistboxchat.js";
import CTBox from "../source/controller/CTBox.js";
import io from "../server.js";
var cthaveLsitFriend = new CTHaveListFriends();
var ctAddFriendReques = new CTAddFriendReques();
var ctHavelistboxchat = new CTHavelistboxchat();
var ctUser = new CTUsers();
var ctBox = new CTBox();
const routeFriends = express.Router();
routeFriends.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    yield cthaveLsitFriend
        .GetHaveListFriendsByIdUser(sercurity.id)
        .catch((v) => { });
    res.json({
        listFirends: cthaveLsitFriend.HaveListFriends,
    });
}));
routeFriends.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var nameUser = req.body.name;
    var s = req.cookies;
    var listUser = [];
    var haveListFriends = [];
    yield Promise.all([
        ctUser.SearchListUserByName(s.id, nameUser),
        cthaveLsitFriend.SearchFirendsByName(s.id, nameUser),
    ])
        .then((v) => {
        listUser = v[0];
        haveListFriends = v[1];
    })
        .catch((v) => {
        console.log(v);
    });
    res.json({
        err: false,
        listUser: listUser,
        listFriends: haveListFriends,
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
        io.to(idFriend).emit("ReqAddFriends", "yêu cầu kết bạn");
    }
    res.json({ err: true, mess: "bạn đã giử thành công" });
}));
routeFriends.post("/listAddFriendRequest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var s = req.cookies;
    var list = yield ctAddFriendReques.ListAddFriendRequest(s.id);
    res.json({
        list: list,
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
export default routeFriends;
