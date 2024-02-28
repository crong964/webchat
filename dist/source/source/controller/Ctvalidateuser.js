var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DeleteValidateAllDB, DeleteValidateDB, GetValidateUserBD, InsertValidateuserBD, UpdateStatusInValidateuserBD, } from "../database/DBvalidateuser.js";
import validateuser from "../model/Validateuser.js";
export default class CTvalidateuser {
    constructor() {
        this.listValidateuser = [];
    }
    InsertValidateuser(p) {
        return __awaiter(this, void 0, void 0, function* () {
            var rt = true;
            yield InsertValidateuserBD(p)
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
            yield UpdateStatusInValidateuserBD(id, status).catch((v) => {
                console.log(v);
                rt = false;
            });
            return rt;
        });
    }
    DeleteValidate(id, sercurity) {
        return __awaiter(this, void 0, void 0, function* () {
            var rt = true;
            yield DeleteValidateDB(id, sercurity).catch((v) => {
                console.log(v);
                rt = false;
            });
            return rt;
        });
    }
    DeleteValidateAll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var rt = true;
            yield DeleteValidateAllDB(id).catch((v) => {
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
            yield GetValidateUserBD(id, cookie)
                .then((v) => {
                rt = v;
            })
                .catch((v) => {
                validatedate = undefined;
            });
            for (let i = 0; i < rt.length; i++) {
                const element = rt[i];
                validatedate = new validateuser();
                validatedate.setAll(element);
            }
            return validatedate;
        });
    }
}
