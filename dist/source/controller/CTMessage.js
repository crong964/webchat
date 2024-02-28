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
const confi_js_1 = require("../../confi.js");
const server_js_1 = require("../../server.js");
const DBMessage_js_1 = require("../database/DBMessage.js");
const message_js_1 = __importDefault(require("../model/message.js"));
class CTMessage {
    constructor() {
        this.listMess = [];
    }
    GetAllContentByidBox(idBox, idUser, day) {
        return __awaiter(this, void 0, void 0, function* () {
            day = day || (0, confi_js_1.formatNowDateYMDHMS)(new Date().toISOString());
            yield (0, DBMessage_js_1.GetAllContentByidBoxDB)(idBox, idUser, day)
                .then((v) => {
                this.setlsMess(v);
            })
                .catch((v) => {
                console.log(v);
            });
            return this.listMess;
        });
    }
    Refesh() {
        this.listMess = [];
    }
    setlsMess(any) {
        this.Refesh();
        let mess;
        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            mess = new message_js_1.default();
            mess.setAll(element);
            this.listMess.push(mess.json());
        }
    }
    InsertContentIn(idBox, idUser, mess, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            yield (0, DBMessage_js_1.InsertContentInDB)(idBox, idUser, mess, type)
                .then((v) => {
                check = v;
            })
                .catch((v) => {
                console.log(v);
                check = undefined;
            });
            return check;
        });
    }
    GetMessById(idMess) {
        return __awaiter(this, void 0, void 0, function* () {
            var mess;
            try {
                var l = yield (0, DBMessage_js_1.GetMessByIdDB)(idMess);
                for (let i = 0; i < l.length; i++) {
                    const e = l[i];
                    mess = new message_js_1.default();
                    mess.setAll(e);
                    break;
                }
            }
            catch (error) {
                console.log(error);
            }
            return mess;
        });
    }
    DelMessById(idMess, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var mess;
            try {
                var l = yield (0, DBMessage_js_1.DelMessByIdDB)(idMess, idUser);
                for (let i = 0; i < l.length; i++) {
                    const e = l[i];
                    mess = new message_js_1.default();
                    mess.setAll(e);
                    break;
                }
            }
            catch (error) {
                console.log(error);
            }
            return mess;
        });
    }
    GetImageMessByidBox(idBox, idUser, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = [];
            try {
                var c = yield (0, DBMessage_js_1.GetImageMessByidBoxDB)(idBox, idUser, limit);
                for (let i = 0; i < c.length; i++) {
                    const element = c[i];
                    let mess = new message_js_1.default();
                    mess.setAll(element);
                    var l = mess.content.split(" ").map((v) => {
                        return `${server_js_1.ip}/v`;
                    });
                    list.push(...l);
                }
            }
            catch (error) {
                console.log(error);
            }
            return list;
        });
    }
}
exports.default = CTMessage;
