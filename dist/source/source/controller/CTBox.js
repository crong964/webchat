var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllBoxByIdInBD, GetEmptyBoxDB, insertNewBoxDB, UpdateBoxTypeDB } from "../database/DBBox.js";
import Box from "../model/Box.js";
var type;
(function (type) {
    type["noFriend"] = "0";
    type["Friend"] = "1";
})(type || (type = {}));
export default class CTBox {
    constructor() {
        this.lsBox = [];
    }
    gettype() {
        return type;
    }
    Refesh() {
        this.lsBox = [];
    }
    getAllBoxByIdUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield getAllBoxByIdInBD(idUser)
                .catch((v) => {
                console.log(v);
            })
                .then((v) => {
                this.setlsBox(v);
            });
            return true;
        });
    }
    insertNewBox() {
        return __awaiter(this, void 0, void 0, function* () {
            yield insertNewBoxDB()
                .catch((v) => {
                console.log(v);
            });
            return true;
        });
    }
    setlsBox(any) {
        this.Refesh();
        this.lsBox = [];
        let box;
        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            box = new Box();
            box.setAll(element);
            this.lsBox.push(box);
        }
    }
    UpdateBoxType(idBox, type) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UpdateBoxTypeDB(idBox, type)
                .catch((v) => {
                console.log(v);
            });
            return true;
        });
    }
    GetEmptyBox() {
        return __awaiter(this, void 0, void 0, function* () {
            yield GetEmptyBoxDB()
                .then((v) => {
                this.setlsBox(v);
            });
            return this.lsBox;
        });
    }
}
