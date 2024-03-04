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
const DBUser_js_1 = require("../database/DBUser.js");
const User_js_1 = __importDefault(require("../model/User.js"));
class ControllerUser {
    constructor() {
        this.rt = {
            err: false,
            result: []
        };
        this.listUser = [];
        this.user = undefined;
    }
    GetUser(account) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reFresh();
            yield (0, DBUser_js_1.GetkUserDatabase)(account)
                .then((v) => {
                this.rt.result = v;
            })
                .catch((v) => {
                console.log(v.result);
                this.rt = v;
            });
            for (let i = 0; i < this.rt.result.length; i++) {
                const element = this.rt.result[i];
                this.user = new User_js_1.default();
                this.user.setAll(element);
                break;
            }
            return this.user;
        });
    }
    InsertNewUser(p) {
        return __awaiter(this, void 0, void 0, function* () {
            var err = false;
            yield (0, DBUser_js_1.InsertNewUserDB)(p)
                .catch((v) => {
                err = true;
                console.log(v);
            });
            return err;
        });
    }
    reFresh() {
        this.rt.err = false;
        this.rt.result = [];
        this.listUser = [];
        this.user = undefined;
    }
    SetlistUser(rt) {
        this.reFresh();
        for (let i = 0; i < rt.length; i++) {
            const element = rt[i];
            this.user = new User_js_1.default();
            this.user.setAll(element);
            this.listUser.push(this.user.json());
        }
    }
    SearchListUserByName(idUser, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DBUser_js_1.ListUserByNameDB)(idUser, name)
                .catch((v) => {
                this.reFresh();
                console.log(v);
            })
                .then((v) => {
                this.SetlistUser(v);
            });
            return this.listUser;
        });
    }
    GetUserById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reFresh();
            yield (0, DBUser_js_1.GetUserByIdDB)(idUser)
                .then((v) => {
                let s = v;
                if (s.length > 0) {
                    this.user = new User_js_1.default();
                    this.user.setAll(s[0]);
                }
            })
                .catch((v) => {
                console.log(v);
            });
            return this.user;
        });
    }
    UpdateUser(p) {
        return __awaiter(this, void 0, void 0, function* () {
            var check = false;
            try {
                yield (0, DBUser_js_1.UpdateUserDB)(p);
                check = true;
            }
            catch (error) {
                console.log(error);
            }
            return check;
        });
    }
}
exports.default = ControllerUser;
