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
const buffer_1 = require("buffer");
const confi_js_1 = __importStar(require("../confi.js"));
const confi_js_2 = require("../confi.js");
const Account_js_1 = __importDefault(require("../source/model/Account.js"));
const Validateuser_js_1 = __importDefault(require("../source/model/Validateuser.js"));
const CtUsers_js_1 = __importDefault(require("../source/controller/CtUsers.js"));
const Ctvalidateuser_js_1 = __importDefault(require("../source/controller/Ctvalidateuser.js"));
const CTBox_js_1 = __importDefault(require("../source/controller/CTBox.js"));
const CtAccout_js_1 = __importDefault(require("../source/controller/CtAccout.js"));
const CTtemporaryuser_js_1 = __importDefault(require("../source/controller/CTtemporaryuser.js"));
const gmail_js_1 = __importDefault(require("../gmail.js"));
const temporaryuser_js_1 = __importDefault(require("../source/model/temporaryuser.js"));
const User_js_1 = __importDefault(require("../source/model/User.js"));
const path_1 = require("path");
var ctAccout = new CtAccout_js_1.default();
var ctUser = new CtUsers_js_1.default();
var ctvalidateuser = new Ctvalidateuser_js_1.default();
var cttemporaryuser = new CTtemporaryuser_js_1.default();
var ctBox = new CTBox_js_1.default();
var gamiAPI = new gmail_js_1.default();
const route = express_1.default.Router();
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    yield cttemporaryuser.fillter();
}), 60000);
route.use((req, res, next) => {
    if ((0, confi_js_2.UnknownObject)(req.body)) {
        res.json({ err: true, mess: "bạn điền chưa đủ" });
        return;
    }
    next();
});
route.get("/sign", (req, res) => {
    res.sendFile(confi_js_1.default + "/font/sign.html");
});
route.post("/sign", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var account = new Account_js_1.default();
    account["setAll"](req.body);
    var err = false;
    yield Promise.all([
        ctAccout.GetAccout(account),
        ctUser.GetUser(account.getAccount()),
    ]).catch((v) => {
        err = true;
    });
    if (err) {
        res.send("lỗi");
        return;
    }
    if (ctUser.user != undefined && ctAccout.account == undefined) {
        res.json({ err: true, mess: "Sai Mật Khẩu" });
        return;
    }
    if (ctUser.user == undefined) {
        res.json({ err: true, mess: "Sai Tài Khoản" });
        return;
    }
    var data = new Date();
    var validateuser = new Validateuser_js_1.default();
    validateuser.id = ctUser.user.id;
    validateuser.cookie = (0, confi_js_2.hash)(ctUser.user.account + validateuser.id + data.toUTCString(), 25);
    validateuser.time = data.getTime();
    validateuser.ab = (0, confi_js_2.hash)(validateuser.cookie + validateuser.time, 25);
    yield ctvalidateuser.InsertValidateuser(validateuser).catch((v) => {
        err = true;
    });
    if (err) {
        res.json("lỗi ");
        return;
    }
    res.cookie("time", validateuser.time, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie("id", ctUser.user.id, {
        maxAge: 1000 * 60 * 60 * 24 * 356,
    });
    res.cookie("ab", validateuser.ab, {
        httpOnly: true,
    });
    res.cookie("sercurity", validateuser.cookie, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 356,
    });
    res.redirect("/");
}));
route.get("/register", (req, res) => {
    res.sendFile(confi_js_1.default + "/font/register.html");
});
route.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var body = req.body;
    if (!(0, confi_js_2.validateEmail)(body.account)) {
        res.json("sai email");
        return;
    }
    yield gamiAPI.loadAll();
    if (!(0, confi_js_2.validatedate)(body.day, body.month, body.year)) {
        res.json({ err: true, mess: "sai ngày tháng" });
        return;
    }
    let tem = new temporaryuser_js_1.default();
    console.log(gamiAPI.getAccessToken());
    tem.setAll(body);
    tem.valiCode = (0, confi_js_2.hash)(JSON.stringify(tem.json()) + gamiAPI.getAccessToken());
    var kq = yield ctUser.GetUser(body.account);
    if (kq != undefined) {
        res.status(400);
        res.json({ mess: "tài khoản đã đăng ký" });
        return;
    }
    if (cttemporaryuser.getTemporaryuser(body.account) != undefined) {
        res.status(400);
        res.json({ mess: "hãy kiểm tra mail để kích hoạt" });
        return;
    }
    var url = `http://localhost:666/account/ValidateAcc/${body.account}/${tem.valiCode}`;
    yield gamiAPI.contentGmail(body.account, url).catch((v) => {
        console.log(v);
        return;
    });
    cttemporaryuser.InsertNew(tem);
    res.status(200).json({ mess: "bạn đã đăng ký thành công hay kích hoạt đi" });
}));
route.get("/logOut", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    console.log(req.cookies);
    yield ctvalidateuser
        .DeleteValidate(sercurity.id, sercurity.sercurity)
        .catch((v) => { });
    res.clearCookie("id");
    res.clearCookie("sercurity");
    res.redirect("/");
}));
route.get("/logOutAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var sercurity = req.cookies;
    console.log(req.cookies);
    var validatedate = yield ctvalidateuser.GetValidateUser(sercurity.id, sercurity.sercurity);
    if (!validatedate) {
        res.json("ok");
        return;
    }
    yield ctvalidateuser.DeleteValidateAll(sercurity.id).catch((v) => { });
    res.clearCookie("id");
    res.clearCookie("sercurity");
    res.clearCookie("ab");
    res.redirect("/");
}));
route.get("/ValidateAcc/:acc/:vali", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    var s = cttemporaryuser.getTemporaryuser(req.params.acc);
    if (s == undefined) {
        res.status(404).json({ mess: "tài khoản này chưa đăng ký" });
        return;
    }
    var account = new Account_js_1.default();
    account.setAll(s);
    var err = false;
    yield ctAccout.InsertAccount(account).catch((v) => {
        console.log(v);
        err = true;
    });
    yield ctUser.InsertNewUser(s).catch((v) => {
        console.log(v);
        err = true;
    });
    if (err) {
        console.log(" có lỗi trong việc thêm tài khoản mới ");
        res.end();
        return;
    }
    res.sendFile(confi_js_1.default + "/font/sign.html");
}));
route.get("/createCodeToChangeAccout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var account = req.query.account;
    if (!account) {
        res.end();
        return;
    }
    if (!(0, confi_js_2.validateEmail)(account)) {
        res.status(302).json({ mess: "đây không phải email" });
        return;
    }
    if (cttemporaryuser.getTemporaryuser(account) != undefined) {
        res
            .status(302)
            .json({ mess: "hãy kiểm tra gmail để thực hiện chức năng đổi mật khẩu" });
        return;
    }
    var s = yield ctUser.GetUser(account);
    if (s == undefined) {
        res.status(404).json({ mess: "tài khoản này không tồn tại" });
        return;
    }
    var check = yield gamiAPI.loadAll();
    if (!check) {
        res.status(404).json({ mess: "lỗi gì đó xảy ra" });
        return;
    }
    var tempuser = new temporaryuser_js_1.default();
    var validateCode = (0, confi_js_2.hash)(account + tempuser.CreatedTime.getTime(), 20);
    var url = `http://localhost:666/account/ForgetAccout/${account}/${validateCode}`;
    check = yield gamiAPI.contentGmail(account, url);
    if (!check) {
        res.status(500).json({ mess: "lỗi hệ thống" });
        return;
    }
    tempuser.account = account;
    tempuser.valiCode = validateCode;
    cttemporaryuser.InsertNew(tempuser);
    res.json({ mess: "hãy kiểm tra gmail của bạn" });
}));
route.get("/ForgetAccout/:account/:validateCode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var account = req.params.account;
    if (cttemporaryuser.getTemporaryuser(account) == undefined) {
        res.sendFile(confi_js_1.default + "/font/sign.html");
        return;
    }
    res.sendFile(confi_js_1.default + "/font/changeForgetingAccount.html");
}));
route.post("/ForgetAccout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var account = req.body.account;
    var valiCode = req.body.validateCode;
    var password1 = req.body.password;
    var tempuser = cttemporaryuser.getTemporaryuser(account);
    if (tempuser == undefined) {
        res.status(404).json({ mess: "mã kích hoạt đã hết hạn" });
        return;
    }
    if (tempuser.valiCode !== valiCode) {
        res.status(404).json({ mess: "sai mã kích hoạt" });
        return;
    }
    var s = yield ctAccout.UpdatePassword(account, password1);
    res.json({ mess: "đổi thành công" });
}));
route.get("/auth", (req, res) => {
    res.end();
});
route.post("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var g_csrf_token1 = req.body.g_csrf_token;
    var g_csrf_token2 = req.cookies.g_csrf_token;
    var profi = { email: "", name: "", picture: "" };
    if (g_csrf_token1 != g_csrf_token2) {
        res.redirect('/');
        return;
    }
    var s = req.body.credential;
    s.split(".").forEach((v, i) => {
        if (i == 1) {
            profi = JSON.parse(buffer_1.Buffer.from(v, "base64").toString());
            console.log(buffer_1.Buffer.from(v, "base64").toString());
        }
    });
    var account = yield ctAccout.GetAccoutByName(profi.email);
    if (account == undefined) {
        var d = new Account_js_1.default();
        var p = new User_js_1.default();
        d.setAccount(profi.email);
        d.setPassord(g_csrf_token1);
        p.account = profi.email;
        p.nameUser = profi.name;
        p.avatar = profi.picture;
        var check = yield Promise.all([ctAccout.InsertAccount(d), ctUser.InsertNewUser(p)]);
        for (let i = 0; i < check.length; i++) {
            if (!check) {
                (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, "/font/sign.ejs)"), {});
                return;
            }
        }
    }
    var user = yield ctUser.GetUser(profi.email);
    if (user == undefined) {
        (0, confi_js_1.renderHtml)(res, (0, path_1.join)(confi_js_1.default, "/font/sign.ejs)"), {});
        return;
    }
    var data = new Date();
    var validateuser = new Validateuser_js_1.default();
    validateuser.id = user.id;
    validateuser.cookie = (0, confi_js_2.hash)(user.account + validateuser.id + data.toUTCString(), 25);
    validateuser.time = data.getTime();
    validateuser.ab = (0, confi_js_2.hash)(validateuser.cookie + validateuser.time, 25);
    var err;
    yield ctvalidateuser.InsertValidateuser(validateuser).catch((v) => {
        err = true;
    });
    if (err) {
        res.json("lỗi ");
        return;
    }
    res.cookie("time", validateuser.time, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie("id", user.id, {
        maxAge: 1000 * 60 * 60 * 24 * 356,
    });
    res.cookie("ab", validateuser.ab, {
        httpOnly: true,
    });
    res.cookie("sercurity", validateuser.cookie, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 356,
    });
    res.redirect("/");
}));
exports.default = route;
