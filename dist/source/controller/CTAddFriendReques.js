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
const DBAddFriendReques_js_1 = require("../database/DBAddFriendReques.js");
const AddFriendRequest_js_1 = __importDefault(require("../model/AddFriendRequest.js"));
var statusRequest;
(function (statusRequest) {
    statusRequest["NotSeen"] = "0";
    statusRequest["Seen"] = "1";
})(statusRequest || (statusRequest = {}));
class CTAddFriendReques {
    constructor() {
        this.addFriendsList = [];
    }
    refesh() {
        this.addFriendsList = [];
    }
    setList(s) {
        this.refesh();
        let addFriendRequest;
        for (let i = 0; i < s.length; i++) {
            const element = s[i];
            addFriendRequest = new AddFriendRequest_js_1.default();
            addFriendRequest.setAll(element);
            this.addFriendsList.push(addFriendRequest.json());
        }
    }
    InAddFriendRequest(idUser, idAddFriends) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = false;
            yield (0, DBAddFriendReques_js_1.InAddFriendRequestDB)(idUser, idAddFriends)
                .then((v) => {
                let s = v;
                if (s.length > 0) {
                    check = true;
                }
                else {
                    check = false;
                }
            })
                .catch((v) => {
                console.log(v);
                check = true;
            });
            return check;
        });
    }
    InsertAddFriendRequest(idUser, idAddFriends) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            yield (0, DBAddFriendReques_js_1.InsertAddFriendRequestDB)(idUser, idAddFriends)
                .then((v) => {
                check = true;
            })
                .catch((v) => {
                check = false;
            });
            return check;
        });
    }
    ListAddFriendRequest(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var s;
            s = yield (0, DBAddFriendReques_js_1.ListAddFriendRequestDB)(idUser);
            this.setList(s);
            return this.addFriendsList;
        });
    }
    CancelingFriendRequest(idFriendRequest, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = false;
            yield (0, DBAddFriendReques_js_1.CancelingFriendRequestDB)(idFriendRequest, idUser)
                .then((v) => {
                s = true;
            })
                .catch((v) => {
                console.log(v);
                s = false;
            });
            return s;
        });
    }
    ListSentFriendRequest(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBAddFriendReques_js_1.ListSentFriendRequestDB)(idUser)
                .then((v) => {
                this.setList(v);
            })
                .catch((v) => {
                console.log(v);
            });
            return this.addFriendsList;
        });
    }
    GetCountFriendRequestByStatus(idAddFriend, status) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = statusRequest[status];
            var check = 0;
            try {
                var ls = yield (0, DBAddFriendReques_js_1.GetCountFriendRequestByStatusDB)(idAddFriend, s);
                for (let i = 0; i < ls.length; i++) {
                    const element = ls[i];
                    check = element.c;
                    break;
                }
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    UpdateFriendRequestBySeen(idAddFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = true;
            try {
                yield (0, DBAddFriendReques_js_1.UpdateFriendRequestBySeenDB)(idAddFriend);
            }
            catch (error) {
                console.log(error);
                check = false;
            }
            return check;
        });
    }
}
exports.default = CTAddFriendReques;
