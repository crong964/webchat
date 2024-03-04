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
exports.ip = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const confi_js_1 = __importStar(require("./confi.js"));
const account_js_1 = __importDefault(require("./route/account.js"));
const friends_js_1 = __importDefault(require("./route/friends.js"));
const box_js_1 = __importDefault(require("./route/box.js"));
const message_js_1 = __importDefault(require("./route/message.js"));
const user_js_1 = __importDefault(require("./route/user.js"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
const cookie_1 = require("cookie");
const Ctvalidateuser_js_1 = __importDefault(require("./source/controller/Ctvalidateuser.js"));
const CTHavelistboxchat_js_1 = __importDefault(require("./source/controller/CTHavelistboxchat.js"));
const CTMessage_js_1 = __importDefault(require("./source/controller/CTMessage.js"));
const path_1 = require("path");
const CTBox_js_1 = __importDefault(require("./source/controller/CTBox.js"));
const CtUsers_js_1 = __importDefault(require("./source/controller/CtUsers.js"));
const CTAddFriendReques_js_1 = __importDefault(require("./source/controller/CTAddFriendReques.js"));
const upload_js_1 = __importDefault(require("./route/upload.js"));
const map_js_1 = __importDefault(require("./route/map.js"));
const groupbox_js_1 = __importDefault(require("./route/groupbox.js"));
var ctmessage = new CTMessage_js_1.default();
var cthavelistboxchat = new CTHavelistboxchat_js_1.default();
var ctvalidateuser = new Ctvalidateuser_js_1.default();
var ctbox = new CTBox_js_1.default();
var ctuser = new CtUsers_js_1.default();
var ctAddFriendReques = new CTAddFriendReques_js_1.default();
var port = 666;
exports.ip = "";
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use("/public", express_1.default.static((0, path_1.join)(confi_js_1.default, 'public')));
app.use("/static", express_1.default.static((0, path_1.join)(process.cwd(), 'dist/client')));
const io = new socket_io_1.Server(server, {});
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({}));
app.use(express_1.default.urlencoded({ extended: true, limit: "500mb" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
function Vali(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, confi_js_1.validate)(req)) {
            next();
            return;
        }
        var sercurity = req.cookies;
        var s = yield ctvalidateuser.GetValidateUser(sercurity.id, sercurity.sercurity);
        if (!s) {
            res.json({
                err: true
            });
            return;
        }
        var date = new Date();
        sercurity.ab = (0, confi_js_1.hash)(sercurity.sercurity + date.getTime(), 25);
        res.cookie("time", date.getTime(), {
            httpOnly: true
        });
        res.cookie("ab", sercurity.ab, {
            httpOnly: true
        });
        next();
    });
}
app.use("/account", account_js_1.default);
app.use("/friends", Vali, friends_js_1.default);
app.use("/box", Vali, box_js_1.default);
app.use("/groupbox", Vali, groupbox_js_1.default);
app.use("/mess", Vali, message_js_1.default);
app.use("/map", Vali, map_js_1.default);
app.use("/upload", upload_js_1.default);
app.use("/user", user_js_1.default);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    if (!(0, confi_js_1.validate)(req)) {
        var s = yield ctvalidateuser.GetValidateUser(sercurity.id, sercurity.sercurity);
        if (!s) {
            (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, "/font/sign.ejs"), {}, "html");
            return;
        }
        var date = new Date();
        sercurity.ab = (0, confi_js_1.hash)(sercurity.sercurity + date.getTime(), 25);
        res.cookie("time", date.getTime(), {
            httpOnly: true,
        });
        res.cookie("ab", sercurity.ab, {
            httpOnly: true,
        });
    }
    res.sendFile((0, path_1.join)(confi_js_1.default, 'client/index.html'));
}));
app.post("/author", Vali, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    var exl = yield Promise.all([
        ctuser.GetUserById(sercurity.id),
        ctAddFriendReques.GetCountFriendRequestByStatus(sercurity.id, "NotSeen")
    ]);
    res.json({ err: false, us: exl[0], c: exl[1] });
}));
// app.get("/test", (req, res) => {
//   io.in(req.cookies.id + "").emit("receiveMessTest", { idMess: "11", idFriend: req.cookies.id, idBox: '11', content: "data.content", type: "0", ngay: "ngay" });
//   res.json({})
// })
// app.get("/ui", async (req, res) => {
//   var sercurity: sercurity = req.cookies;
//   if (!validate(req)) {
//     var s = await ctvalidateuser.GetValidateUser(
//       sercurity.id,
//       sercurity.sercurity
//     );
//     if (!s) {
//       renderHtml(res, join(__dirname, "/font/sign.ejs"), {})
//       return;
//     }
//     var date = new Date();
//     sercurity.ab = hash(sercurity.sercurity + date.getTime(), 25);
//     res.cookie("time", date.getTime(), {
//       httpOnly: true,
//     });
//     res.cookie("ab", sercurity.ab, {
//       httpOnly: true,
//     });
//   }
//   var l = await Promise.all(
//     [ctbox.getAllBoxByIdUser(sercurity.id), ctuser.GetUserById(sercurity.id), ctAddFriendReques.GetCountFriendRequestByStatus(sercurity.id, "NotSeen")])
//   renderHtml(res, join(__dirname, "/font/index.ejs"), { listBoxchat: ctbox.lsBox, us: l[1], c: l[2] })
// });
// app.get("/test", async (req, res) => {
//   if (validate(req)) {
//     res.sendFile(__dirname + "/font/client.html");
//     return;
//   }
//   var sercurity: sercurity = req.cookies;
//   var s = await ctvalidateuser.GetValidateUser(
//     sercurity.id,
//     sercurity.sercurity
//   );
//   if (!s) {
//     res.sendFile(__dirname + "/font/sign.html");
//     return;
//   }
//   var date = new Date();
//   sercurity.ab = hash(sercurity.sercurity + date.getTime(), 25);
//   res.cookie("time", date.getTime(), {
//     httpOnly: true,
//   });
//   res.cookie("ab", sercurity.ab, {
//     httpOnly: true,
//   });
//   res.sendFile(__dirname + "/font/client.html");
// });
server.listen(port, () => {
    exports.ip = `http://localhost:${port}`;
    console.log(`http://localhost:${port}`);
    //console.log(`http://localhost:${port}/ui`);
});
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    var cookie = (0, cookie_1.parse)(socket.handshake.headers.cookie ? socket.handshake.headers.cookie : "");
    var s = yield ctvalidateuser.GetValidateUser(cookie.id, cookie.sercurity);
    if (!s) {
        socket.emit("ended");
        return;
    }
    io.in(socket.id).socketsJoin(cookie.id);
    yield ctvalidateuser.UpdateStatusInValidateuser(cookie.id, (yield io.in(cookie.id).allSockets()).size);
    socket.on("disconnecting", (reason) => __awaiter(void 0, void 0, void 0, function* () {
        var rooms = socket.rooms;
        rooms.forEach((element) => {
            socket.leave(element);
        });
        yield ctvalidateuser.UpdateStatusInValidateuser(cookie.id, (yield io.in(cookie.id).allSockets()).size);
    }));
    socket.on("sendMess", (data) => __awaiter(void 0, void 0, void 0, function* () {
        let check = yield cthavelistboxchat.IsIdUserInBox(cookie.id, data.idBox);
        if (!check) {
            socket.emit("ReqAddFriends", "sai box");
            return;
        }
        let v = yield Promise.all([
            cthavelistboxchat.visualBoxChat(cookie.id, data.idBox),
            cthavelistboxchat.SetNotSeenInBox(cookie.id, data.idBox),
            ctmessage.InsertContentIn(data.idBox, cookie.id, data.content),
            ctbox.UpdateLastMessBox(cookie.id, data.content, data.idBox, "mess")
        ]);
        if (!v[0] && v[2] == undefined) {
            socket.emit("ReqAddFriends", "lỗi");
            return;
        }
        var list = yield cthavelistboxchat.GetIdUserOnlineInBox(cookie.id, data.idBox);
        yield io
            .in(cookie.id)
            .allSockets()
            .then((v) => {
            v.forEach((idSocket) => {
                if (idSocket != socket.id) {
                    socket.to(idSocket).emit("ReqAddFriends", "có thông báo");
                }
                else {
                    socket.emit("ReqAddFriends", "gửi thành công");
                }
            });
        });
        var s = (new Date()).toDateString();
        var ngay = (0, confi_js_1.formatNowDateYMDHMS)(s);
        list.forEach((id) => {
            io.in(id.idUser + "").emit("receiveMess", { idMess: v[2].insertId, idFriend: cookie.id, idBox: data.idBox, content: data.content, type: "0", ngay: ngay });
        });
    }));
}));
exports.default = io;
