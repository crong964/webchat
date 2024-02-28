var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GetAccoutDatabase, InsertAccountDB, UpdatePasswordDB } from "../database/DBAccount.js";
import Account from "../model/Account.js";
export default class ctAccout {
    constructor() {
        this.rt = {
            err: false,
            result: []
        };
        this.listAccount = [];
        this.account = undefined;
    }
    GetAccout(s) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Refesh();
            yield GetAccoutDatabase(s)
                .then((v) => {
                this.rt.result = v;
            })
                .catch((v) => {
                console.log(v.result);
                this.rt = v;
            });
            for (let i = 0; i < this.rt.result.length; i++) {
                const element = this.rt.result[i];
                this.account = new Account();
                this.account.setAll(element);
                break;
            }
            return this.account;
        });
    }
    InsertAccount(s) {
        return __awaiter(this, void 0, void 0, function* () {
            yield InsertAccountDB(s)
                .catch((v) => {
                console.log(v);
                this.rt = v;
            });
            return this.rt;
        });
    }
    Refesh() {
        this.listAccount = [];
        this.account = undefined;
    }
    UpdatePassword(account, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = true;
            yield UpdatePasswordDB(account, password)
                .then((v) => {
            })
                .catch((v) => {
                console.log(v);
                check = false;
            });
            return check;
        });
    }
}
