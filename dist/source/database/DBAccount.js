"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAccoutByNameDatabase = exports.UpdatePasswordDB = exports.InsertAccountDB = exports.GetAccoutDatabase = void 0;
const confi_js_1 = require("../../confi.js");
const mysql2_1 = __importDefault(require("mysql2"));
function GetAccoutDatabase(p) {
    return new Promise((res, error) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = "SELECT * FROM `account` WHERE account.account=? AND account.password=?";
            con.query(sql, [p.getAccount(), p.getPassword()], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                else {
                    res(ru);
                }
                con.end();
            });
        });
    });
}
exports.GetAccoutDatabase = GetAccoutDatabase;
function InsertAccountDB(p) {
    return new Promise((res, error) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = "INSERT INTO `account`(`account`, `password`) VALUES (?,?)";
            con.query(sql, [p.getAccount(), p.getPassword()], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                else {
                    res(ru);
                }
                con.end();
            });
        });
    });
}
exports.InsertAccountDB = InsertAccountDB;
function UpdatePasswordDB(account, password) {
    return new Promise((res, error) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = `UPDATE account SET password = ? WHERE account = ?`;
            con.query(sql, [password, account], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                else {
                    res(ru);
                }
                con.end();
            });
        });
    });
}
exports.UpdatePasswordDB = UpdatePasswordDB;
function GetAccoutByNameDatabase(p) {
    return new Promise((res, error) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = "SELECT * FROM `account` WHERE account.account=?";
            con.query(sql, [p], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                else {
                    res(ru);
                }
                con.end();
            });
        });
    });
}
exports.GetAccoutByNameDatabase = GetAccoutByNameDatabase;
