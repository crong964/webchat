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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importStar(require("path"));
const confi_js_1 = __importStar(require("../confi.js"));
const CTMessage_js_1 = __importDefault(require("../source/controller/CTMessage.js"));
const CTBox_js_1 = __importDefault(require("../source/controller/CTBox.js"));
const CTHavelistboxchat_js_1 = __importDefault(require("../source/controller/CTHavelistboxchat.js"));
const server_js_1 = __importDefault(require("../server.js"));
const firebase_js_1 = __importDefault(require("../utility/firebase.js"));
const promises_1 = require("fs/promises");
var ctbox = new CTBox_js_1.default;
var ctmess = new CTMessage_js_1.default();
var cthavelistboxchat = new CTHavelistboxchat_js_1.default;
const upload = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, (0, path_1.join)(confi_js_1.default, '/public/upload'));
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${f}`);
    }
});
const mutil = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 10000000000
    },
    fileFilter(req, file, callback) {
        callback(null, true);
    },
}).array("image", 9);
upload.post('/', mutil, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var files = req.files;
    var idBox = req.body.idBox;
    var s = req.cookies;
    var ls = files.map((v) => __awaiter(void 0, void 0, void 0, function* () {
        var name = yield firebase_js_1.default.UploadImage(path_1.default.join(process.cwd(), "dist\\public\\upload", v.filename), v.mimetype);
        return name;
    }));
    var names = yield Promise.all(ls);
    var deleteLS = files.map((v) => __awaiter(void 0, void 0, void 0, function* () {
        var pathImage = path_1.default.join(process.cwd(), "dist\\public\\upload", v.filename);
        try {
            yield (0, promises_1.unlink)(pathImage);
        }
        catch (error) {
            console.log(error);
        }
        return true;
    }));
    var messfile = names.reduce((a, b) => {
        a += `${b} `;
        return a;
    }, "");
    let check = yield cthavelistboxchat.IsIdUserInBox(s.id, idBox);
    if (!check) {
        server_js_1.default.to(s.id).emit("ReqAddFriends", "sai box");
        return;
    }
    let v = yield Promise.all([
        cthavelistboxchat.visualBoxChat(s.id, idBox),
        cthavelistboxchat.SetNotSeenInBox(s.id, idBox),
        ctmess.InsertContentIn(idBox, s.id, messfile, "1"),
        ctbox.UpdateLastMessBox(s.id, messfile, idBox, "image"),
        deleteLS
    ]);
    if (!v[0] && !v[2]) {
        server_js_1.default.to(s.id).emit("ReqAddFriends", "sai box");
        return;
    }
    var list = yield cthavelistboxchat.GetIdUserOnlineInBox(s.id, idBox);
    var ngays = (new Date()).toDateString();
    var ngay = (0, confi_js_1.formatNowDateYMDHMS)(ngays);
    list.forEach((v) => {
        server_js_1.default.in(v.idUser + "").emit("receiveMess", { idFriend: s.id, idBox: idBox, content: messfile, type: "1", ngay: ngay });
    });
    res.send({
        idBox: idBox, content: messfile, type: "1", ngay: ngay
    });
}));
exports.default = upload;
