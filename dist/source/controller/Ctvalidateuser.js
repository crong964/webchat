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
const DBvalidateuser_js_1 = require("../database/DBvalidateuser.js");
const Validateuser_js_1 = __importDefault(require("../model/Validateuser.js"));
class CTvalidateuser {
    constructor() {
        this.listValidateuser = [];
    }
    InsertValidateuser(p) {
        return __awaiter(this, void 0, void 0, function* () {
            var rt = true;
            yield (0, DBvalidateuser_js_1.InsertValidateuserBD)(p)
                .catch((v) => {
                console.log(v);
                rt = false;
            })
                .then((v) => {
                console.log(v);
            });
            return rt;
        });
    }
    UpdateStatusInValidateuser(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            var rt = true;
            yield (0, DBvalidateuser_js_1.UpdateStatusInValidateuserBD)(id, status).catch((v) => {
                console.log(v);
                rt = false;
            });
            return rt;
        });
    }
    DeleteValidate(id, sercurity) {
        return __awaiter(this, void 0, void 0, function* () {
            var rt = true;
            yield (0, DBvalidateuser_js_1.DeleteValidateDB)(id, sercurity).catch((v) => {
                console.log(v);
                rt = false;
            });
            return rt;
        });
    }
    DeleteValidateAll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var rt = true;
            yield (0, DBvalidateuser_js_1.DeleteValidateAllDB)(id).catch((v) => {
                console.log(v);
                rt = false;
            });
            return rt;
        });
    }
    GetValidateUser(id, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            var rt = [];
            var validatedate = undefined;
            yield (0, DBvalidateuser_js_1.GetValidateUserBD)(id, cookie)
                .then((v) => {
                rt = v;
            })
                .catch((v) => {
                validatedate = undefined;
                console.log(v);
            });
            for (let i = 0; i < rt.length; i++) {
                const element = rt[i];
                validatedate = new Validateuser_js_1.default();
                validatedate.setAll(element);
            }
            return validatedate;
        });
    }
}
exports.default = CTvalidateuser;
