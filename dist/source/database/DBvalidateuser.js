"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteValidateAllDB = exports.DeleteValidateDB = exports.GetValidateUserBD = exports.UpdateStatusInValidateuserBD = exports.InsertValidateuserBD = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const confi_js_1 = require("../../confi.js");
function InsertValidateuserBD(p) {
    return new Promise((res, err) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            let sql = "INSERT INTO `validateuser`(`id`, `cookie`, `socket`, `status`) VALUES (?,?,?,?)";
            con.query(sql, [p.id, p.cookie, p.socket, 1], (e, result, fiel) => {
                if (e) {
                    err(e.message);
                }
                res(result);
                con.end();
            });
        });
    });
}
exports.InsertValidateuserBD = InsertValidateuserBD;
function UpdateStatusInValidateuserBD(id, status) {
    return new Promise((res, err) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e);
            }
            let sql = "UPDATE `validateuser` SET `status`=? WHERE id=?";
            con.query(sql, [status, id], (e, rt, fiels) => {
                if (e) {
                    err(e);
                }
                res(true);
                con.end();
            });
        });
    });
}
exports.UpdateStatusInValidateuserBD = UpdateStatusInValidateuserBD;
function GetValidateUserBD(id, cookie) {
    return new Promise((res, rea) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                rea(err);
            }
            let query = "SELECT `id`, `cookie`, `socket`, `status` FROM `validateuser` WHERE id=? AND cookie=?";
            con.query(query, [id, cookie], (err, rt, fiels) => {
                if (err) {
                    rea(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetValidateUserBD = GetValidateUserBD;
function DeleteValidateDB(id, cookie) {
    return new Promise((res, rea) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                rea(err);
            }
            let query = "DELETE FROM `validateuser` WHERE id=? and cookie=?";
            con.query(query, [id, cookie], (err, rt, fiels) => {
                if (err) {
                    rea(err);
                }
                res(true);
                con.end();
            });
        });
    });
}
exports.DeleteValidateDB = DeleteValidateDB;
function DeleteValidateAllDB(id) {
    return new Promise((res, rea) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                rea(err);
            }
            let query = "DELETE FROM `validateuser` WHERE id=?";
            con.query(query, id, (err, rt, fiels) => {
                if (err) {
                    rea(err);
                }
                res(true);
                con.end();
            });
        });
    });
}
exports.DeleteValidateAllDB = DeleteValidateAllDB;
