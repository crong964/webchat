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
const DBBox_js_1 = require("../database/DBBox.js");
const Box_js_1 = __importDefault(require("../model/Box.js"));
var type;
(function (type) {
    type["noFriend"] = "0";
    type["Friend"] = "1";
})(type || (type = {}));
var boxtype;
(function (boxtype) {
    boxtype["friend"] = "0";
    boxtype["nofriend"] = "1";
    boxtype["group"] = "2";
})(boxtype || (boxtype = {}));
class CTBox {
    gettype() {
        return type;
    }
    constructor() {
        this.lsBox = [];
    }
    Refesh() {
        this.lsBox = [];
    }
    getAllBoxByIdUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBBox_js_1.getAllBoxByIdInBD)(idUser)
                .catch((v) => {
                console.log(v);
            })
                .then((v) => {
                this.setlsBox(v);
            });
            return true;
        });
    }
    insertNewBox(type) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = yield (0, DBBox_js_1.insertNewBoxDB)(boxtype[type]);
            }
            catch (e) {
                console.log(e);
            }
            return check["insertId"];
        });
    }
    setlsBox(any) {
        this.Refesh();
        this.lsBox = [];
        let box;
        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            box = new Box_js_1.default();
            box.setAll(element);
            this.lsBox.push(box);
        }
    }
    UpdateBoxType(idBox, type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBBox_js_1.UpdateBoxTypeDB)(idBox, type)
                .catch((v) => {
                console.log(v);
            });
            return true;
        });
    }
    GetEmptyBox() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBBox_js_1.GetEmptyBoxDB)()
                .then((v) => {
                this.setlsBox(v);
            });
            return this.lsBox;
        });
    }
    UpdateLastMessBox(idUser, content, idBox, type) {
        return __awaiter(this, void 0, void 0, function* () {
            var check;
            try {
                check = yield (0, DBBox_js_1.UpdateLastMessBoxDB)(idUser, content, idBox, type);
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    GetBoxbyIdBox(idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var box;
            try {
                var ls = yield (0, DBBox_js_1.GetBoxbyIdBoxDB)(idBox);
                for (let i = 0; i < ls.length; i++) {
                    const element = ls[i];
                    box = new Box_js_1.default();
                    box.setAll(element);
                    break;
                }
            }
            catch (error) {
                console.log(error);
            }
            return box;
        });
    }
}
exports.default = CTBox;
