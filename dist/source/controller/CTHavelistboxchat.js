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
exports.menberType = exports.statusBox = void 0;
const DBHavelistboxchat_js_1 = require("../database/DBHavelistboxchat.js");
const Box_js_1 = __importDefault(require("../model/Box.js"));
const HaveListBox_js_1 = __importDefault(require("../model/HaveListBox.js"));
var statusBox;
(function (statusBox) {
    statusBox["Hidden"] = "0";
    statusBox["Seen"] = "1";
    statusBox["Unread"] = "2";
})(statusBox || (exports.statusBox = statusBox = {}));
var menberType;
(function (menberType) {
    menberType["notMenber"] = "-1";
    menberType["Menber"] = "0";
    menberType["extraAdmin"] = "2";
})(menberType || (exports.menberType = menberType = {}));
class CTHavelistboxchat {
    constructor() {
        this.listBox = [];
    }
    hiddenBoxChat(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = false;
            yield (0, DBHavelistboxchat_js_1.UpdateStatusBox)(idUser, idBox, statusBox.Hidden)
                .then((v) => {
                if (v.changedRows == 1) {
                    s = true;
                }
            })
                .catch((v) => {
                console.log(v);
            });
            return s;
        });
    }
    GetIdBoxbyIdUserAndIdFriend(idUser, idFriend) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBHavelistboxchat_js_1.GetIdBoxbyIdUserAndIdFriendDB)(idUser, idFriend)
                .then((v) => {
                this.setlsBox(v);
            })
                .catch((v) => {
                console.log(v);
                this.Refesh();
            });
            return this.listBox;
        });
    }
    setlsBox(any) {
        this.Refesh();
        let box;
        for (let i = 0; i < any.length; i++) {
            const element = any[i];
            box = new Box_js_1.default();
            box.setAll(element);
            this.listBox.push(box.json());
        }
    }
    Refesh() {
        this.listBox = [];
    }
    InsertIdToNewBox(idUser, idBox, idFriend, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            idFriend = idFriend || idUser;
            admin = admin || "0";
            yield (0, DBHavelistboxchat_js_1.InsertIdToNewBoxDB)(idUser, idBox, idFriend, admin)
                .then((v) => { })
                .catch((v) => {
                console.log("ok");
                console.log(v);
            });
            return true;
        });
    }
    visualBoxChat(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = false;
            yield (0, DBHavelistboxchat_js_1.UpdateStatusBox)(idUser, idBox, statusBox.Seen)
                .then((v) => {
                s = true;
            })
                .catch((v) => {
                console.log(v);
            });
            return s;
        });
    }
    GetIdUserOnlineInBox(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBHavelistboxchat_js_1.GetIdUserOnlineInBoxDB)(idBox, idUser).then((v) => {
                this.setlsBox(v);
            }).catch((v) => {
                console.log(v);
            });
            return this.listBox;
        });
    }
    IsIdUserInBox(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = false;
            yield (0, DBHavelistboxchat_js_1.IsIdUserInBoxDB)(idUser, idBox)
                .then((v) => {
                if (v.length > 0) {
                    check = true;
                }
            })
                .catch((v) => {
                console.log(v);
            });
            return check;
        });
    }
    SetNotSeenInBox(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = false;
            yield (0, DBHavelistboxchat_js_1.SetNotSeenInBoxDB)(idUser, idBox)
                .then((v) => {
                if (v.changedRows > 0) {
                    check = true;
                }
            })
                .catch((v) => {
                console.log(v);
            });
            return check;
        });
    }
    GetHaveListidBoxByIdUser(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            let check;
            try {
                var ls = yield (0, DBHavelistboxchat_js_1.GetHaveListidBoxByIdUserDB)(idUser, idBox);
                for (let i = 0; i < ls.length; i++) {
                    const element = ls[i];
                    check = new HaveListBox_js_1.default();
                    check.setAll(element);
                    break;
                }
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
    DeleteMenberInGroup(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            let check;
            try {
                yield (0, DBHavelistboxchat_js_1.DeleteMenberInGroupDB)(idUser, idBox);
                check = true;
            }
            catch (error) {
                check = false;
                console.log(error);
            }
            return check;
        });
    }
    UpLevelMenberInGroup(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            let check;
            try {
                yield (0, DBHavelistboxchat_js_1.UpdateMenberInGroupDB)(idUser, idBox, menberType.extraAdmin);
                check = true;
            }
            catch (error) {
                check = false;
                console.log(error);
            }
            return check;
        });
    }
    GetAllMenberInChatGroup(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var userL = [];
            try {
                var ls = yield (0, DBHavelistboxchat_js_1.GetAllMenberInChatGroupDB)(idUser, idBox);
                for (let i = 0; i < ls.length; i++) {
                    const element = ls[i];
                    var temp = new HaveListBox_js_1.default();
                    temp.setAll(element);
                    userL.push(temp);
                }
            }
            catch (error) {
                console.log(error);
            }
            return userL;
        });
    }
}
exports.default = CTHavelistboxchat;
