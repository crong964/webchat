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
const st = __importStar(require("firebase/storage"));
const fb = __importStar(require("firebase/app"));
const fs_1 = __importDefault(require("fs"));
require("dotenv/config");
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
    databaseURL: process.env.DATABASEURL
};
class Firebase {
    constructor() {
    }
    static UploadImage(path, contentType) {
        return __awaiter(this, void 0, void 0, function* () {
            var pathUpload = "";
            var ss = path.split("\\");
            var name = ss[ss.length - 1];
            var data = fs_1.default.readFileSync(path, { encoding: "base64" });
            var ref = st.ref(Firebase.storage, name);
            try {
                yield st.uploadString(ref, data, "base64", { contentType: contentType });
                pathUpload = yield st.getDownloadURL(ref);
                pathUpload = pathUpload.replace("https://firebasestorage.googleapis.com/v0/b/supple-league-394102.appspot.com/o/", "");
            }
            catch (error) {
                console.log(error);
            }
            return pathUpload;
        });
    }
    static DeleteFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            var files = file.split("?");
            var name = files[0];
            const ref = st.ref(Firebase.storage, name);
            try {
                st.deleteObject(ref);
                check = true;
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
}
Firebase.app = fb.initializeApp(firebaseConfig);
Firebase.storage = st.getStorage(Firebase.app);
exports.default = Firebase;
