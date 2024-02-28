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
exports.CTHiddenMess = void 0;
const DBHiddenMess_js_1 = require("../database/DBHiddenMess.js");
const HiddenMess_js_1 = __importDefault(require("../model/HiddenMess.js"));
class CTHiddenMess {
    constructor() {
    }
    InsertHiddenmess(idMess, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var f;
            try {
                yield (0, DBHiddenMess_js_1.InsertHiddenmessDB)(idMess, idUser);
                f = true;
            }
            catch (error) {
                f = false;
                console.log(error);
            }
            return f;
        });
    }
    DelHiddenMess(idMess) {
        return __awaiter(this, void 0, void 0, function* () {
            var f;
            try {
                yield (0, DBHiddenMess_js_1.DelHiddenmessDB)(idMess);
                f = true;
            }
            catch (error) {
                f = false;
                console.log(error);
            }
            return f;
        });
    }
    GetHiddenMessByidMessidUser(idMess, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var f = undefined;
            try {
                var l = yield (0, DBHiddenMess_js_1.GetHiddenMessByidMessidUserDB)(idMess, idUser);
                for (let i = 0; i < l.length; i++) {
                    const element = l[i];
                    f = new HiddenMess_js_1.default();
                    f.setAll(element);
                }
            }
            catch (error) {
                console.log(error);
            }
            return f;
        });
    }
}
exports.CTHiddenMess = CTHiddenMess;
