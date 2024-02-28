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
const DBAccount_js_1 = require("../database/DBAccount.js");
const Account_js_1 = __importDefault(require("../model/Account.js"));
class ctAccout {
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
            yield (0, DBAccount_js_1.GetAccoutDatabase)(s)
                .then((v) => {
                this.rt.result = v;
            })
                .catch((v) => {
                console.log(v.result);
                this.rt = v;
            });
            for (let i = 0; i < this.rt.result.length; i++) {
                const element = this.rt.result[i];
                this.account = new Account_js_1.default();
                this.account.setAll(element);
                break;
            }
            return this.account;
        });
    }
    InsertAccount(s) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = true;
            yield (0, DBAccount_js_1.InsertAccountDB)(s)
                .catch((v) => {
                console.log(v);
                this.rt = v;
                check = false;
            });
            return check;
        });
    }
    Refesh() {
        this.listAccount = [];
        this.account = undefined;
    }
    UpdatePassword(account, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = true;
            yield (0, DBAccount_js_1.UpdatePasswordDB)(account, password)
                .then((v) => {
            })
                .catch((v) => {
                console.log(v);
                check = false;
            });
            return check;
        });
    }
    GetAccoutByName(account) {
        return __awaiter(this, void 0, void 0, function* () {
            var g;
            try {
                var l = yield (0, DBAccount_js_1.GetAccoutByNameDatabase)(account);
                for (let i = 0; i < l.length; i++) {
                    const element = l[i];
                    g = new Account_js_1.default();
                    g.setAll(element);
                    break;
                }
            }
            catch (error) {
                console.log(error);
                g = undefined;
            }
            return g;
        });
    }
}
exports.default = ctAccout;
