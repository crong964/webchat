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
const DBHaveListFriends_js_1 = require("../database/DBHaveListFriends.js");
const HaveListFriends_js_1 = __importDefault(require("../model/HaveListFriends.js"));
class CTHaveListFriends {
    constructor() {
        this.HaveListFriends = [];
    }
    refesh() {
        this.HaveListFriends = [];
    }
    SetHaveListFriends(rt) {
        this.refesh();
        let havelistfriends;
        for (let i = 0; i < rt.length; i++) {
            const element = rt[i];
            havelistfriends = new HaveListFriends_js_1.default();
            havelistfriends.setAll(element);
            this.HaveListFriends.push(havelistfriends.json());
        }
    }
    GetHaveListFriendsByIdUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBHaveListFriends_js_1.GetHaveListFriendsByIdUserDB)(idUser)
                .catch((v) => {
                console.log(v);
                this.HaveListFriends = [];
            })
                .then((v) => {
                this.SetHaveListFriends(v);
            });
            return this.HaveListFriends;
        });
    }
    SearchFirendsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBHaveListFriends_js_1.SearchFirendsByIdDB)(id)
                .catch((v) => {
                this.refesh();
                console.log(v);
            })
                .then((v) => {
                this.SetHaveListFriends(v);
            });
            return this.HaveListFriends;
        });
    }
    SearchFirendsByName(iduser, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBHaveListFriends_js_1.SearchFirendsByNameDB)(iduser, name)
                .catch((v) => {
                this.refesh();
                console.log(v);
            })
                .then((v) => {
                this.SetHaveListFriends(v);
            });
            return this.HaveListFriends;
        });
    }
    IsFriendInList(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            yield (0, DBHaveListFriends_js_1.IsFriendInListDB)(idUser, idFriend)
                .then((v) => {
                var s = v;
                if (s.length > 0) {
                    check = true;
                }
                else {
                    check = false;
                }
            })
                .catch((v) => {
                check = true;
                console.log(v);
            });
            return check;
        });
    }
    insertListFriends(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = false;
            yield (0, DBHaveListFriends_js_1.insertListFriendsDB)(idUser, idFriend)
                .catch((v) => {
                console.log(v);
            })
                .then((v) => {
                s = true;
            });
            return s;
        });
    }
    CancelFriends(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = true;
            yield (0, DBHaveListFriends_js_1.CancelFriendsDB)(idUser, idFriend)
                .catch((v) => {
                s = false;
                console.log(v);
            })
                .then((v) => {
                s = true;
            });
            return s;
        });
    }
}
exports.default = CTHaveListFriends;
