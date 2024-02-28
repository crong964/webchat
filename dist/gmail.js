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
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
const buffer_1 = require("buffer");
const confi_js_1 = __importDefault(require("./confi.js"));
// var em = "huyihuy140@gmail.com"
// var s = `From: huy91027@gmail.com
// To: ${em}
// Subject: Saying Hello
// This is a message just to say hello.
// So, "Hello".
// `
// s = Buffer.alloc(s.length, s).toString("base64")
// var oauth2Client = new google.auth.OAuth2(
//     credentials.installed.client_id,
//     credentials.installed.client_secret,
//     credentials.installed.redirect_uris[0],
// )
// oauth2Client.setCredentials(token)
// oauth2Client.getAccessToken()
//     .then((v:any) => {
//         console.log(v.token);
//     })
// async function sendMessage() {
//     var oauth2Client = new google.auth.OAuth2()
//     oauth2Client.setCredentials({
//         token,
//         access_token: "ya29.a0Aa4xrXOAP8Ccl_vCeQzccf7lActObXgrwm_4LMrOtlvjH1ckcCvTW1VqioTQqTTnReygz0o2O1zEh1AWYEJd0ObBevx-etyGXl7IE8g_fco1tcH99TLFW8JWK39BQALtrWDkgPS9uOztf5LGpP5y5T3nvJAaUQaCgYKATASARESFQEjDvL9kM_zPv2ILZZGhaX1OJpJNQ0165"
//     })
//     const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
//     var drafts = await gmail.users.drafts.create({
//         userId: "me",
//         requestBody: {
//             message: {
//                 raw: s
//             }
//         }
//     })
//     console.log("................................")
//     console.log(drafts);
//     gmail.users.drafts.send({
//         userId: "me",
//         requestBody: drafts.data
//     })
// }
// sendMessage()
class GamiAPI {
    constructor() {
        this.time = new Date();
        this.client_id = "";
        this.client_secret = "";
        this.refresh_token = "";
        this.AccessToken = "";
    }
    loadToken() {
        return new Promise((rt, rej) => {
            if (this.client_id.length > 0) {
                rt(true);
            }
            fs_1.default.readFile(confi_js_1.default + "/../token.json", (err, data) => {
                if (err) {
                    console.log(err.message);
                    rej(undefined);
                }
                var s = JSON.parse(data.toString());
                rt(s);
            });
        });
    }
    setAll(p) {
        if (p == undefined) {
            return;
        }
        for (const key in this) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                const element = p[key];
                if (element != undefined) {
                    this[key] = p[key];
                }
            }
        }
    }
    updateAccessToken() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (Date.now() - this.time.getTime() >= 1000 * 60 * 15 ||
                ((_a = this.AccessToken) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                var oauth2Client = new googleapis_1.google.auth.OAuth2(this.client_id, this.client_secret, "http://localhost");
                oauth2Client.setCredentials({
                    refresh_token: this.refresh_token,
                });
                this.AccessToken = (yield oauth2Client.getAccessToken()).token;
                if (this.AccessToken == undefined) {
                    console.log("updateAccessToken() không cập nhật được AccessToken");
                    return undefined;
                }
                this.time = new Date();
                return true;
            }
            return this.AccessToken;
        });
    }
    loadAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var token = yield this.loadToken();
            this.setAll(token);
            var access_token = yield this.updateAccessToken();
            if (!token || !access_token) {
                console.log("loadAll(): không tải được token hoặc access_token");
                return false;
            }
            return true;
        });
    }
    contentGmail(recerver, content, Subject) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = yield this.loadAll();
            if (!check) {
                console.log("contentGmail(): không tải lên được ");
                return false;
            }
            Subject = Subject ? Subject : "kich hoat mat khau";
            var s = `From: huy91027@gmail.com\nTo: ${recerver}\nSubject: ${Subject}\n\n${content}.`;
            s = buffer_1.Buffer.alloc(s.length, s).toString("base64");
            yield this.sendMail(s).catch((v) => {
                console.log(v);
                check = false;
            });
            return check;
        });
    }
    sendMail(s) {
        return __awaiter(this, void 0, void 0, function* () {
            var oauth2Client = new googleapis_1.google.auth.OAuth2();
            oauth2Client.setCredentials({
                access_token: this.AccessToken,
            });
            const gmail = googleapis_1.google.gmail({ version: "v1", auth: oauth2Client });
            var draft = yield gmail.users.drafts.create({
                userId: "me",
                requestBody: { message: { raw: s } },
            });
            if (!draft) {
                console.log("sendMail() không tạo được thư gửi đi ");
                return false;
            }
            yield gmail.users.drafts
                .send({
                userId: "me",
                requestBody: draft.data,
            })
                .catch((v) => {
                console.log(v);
            });
            return true;
        });
    }
    getAccessToken() {
        return this.AccessToken;
    }
}
exports.default = GamiAPI;
