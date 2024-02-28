var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GetIdBoxbyIdUserAndIdFriendDB, GetIdUserOnlineInBoxDB, InsertIdToNewBoxDB, IsIdUserInBoxDB, SetNotSeenInBoxDB, UpdateStatusBox, } from "../database/DBHavelistboxchat.js";
import Box from "../model/Box.js";
export var statusBox;
(function (statusBox) {
    statusBox["hidden"] = "0";
    statusBox["visual"] = "1";
})(statusBox || (statusBox = {}));
export default class CTHavelistboxchat {
    constructor() {
        this.listBox = [];
    }
    hiddenBoxChat(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = false;
            yield UpdateStatusBox(idUser, idBox, statusBox.hidden)
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
            yield GetIdBoxbyIdUserAndIdFriendDB(idUser, idFriend)
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
            box = new Box();
            box.setAll(element);
            this.listBox.push(box.json());
        }
    }
    Refesh() {
        this.listBox = [];
    }
    InsertIdToNewBox(idUser, idBox) {
        return __awaiter(this, void 0, void 0, function* () {
            yield InsertIdToNewBoxDB(idUser, idBox)
                .then((v) => { })
                .catch((v) => {
                console.log("ok");
                console.log(v);
            });
            return true;
        });
    }
    visualBoxChat(idUser, idBox, status) {
        return __awaiter(this, void 0, void 0, function* () {
            var s = false;
            yield UpdateStatusBox(idUser, idBox, status)
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
            yield GetIdUserOnlineInBoxDB(idBox, idUser).then((v) => {
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
            yield IsIdUserInBoxDB(idUser, idBox)
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
            yield SetNotSeenInBoxDB(idUser, idBox)
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
}
