"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetHiddenMessByidMessidUserDB = exports.DelHiddenmessDB = exports.InsertHiddenmessDB = void 0;
const confi_js_1 = require("../../confi.js");
const mysql2_1 = __importDefault(require("mysql2"));
function InsertHiddenmessDB(idMess, idUser) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `INSERT INTO hiddenmesslist(idUser, idMess) VALUES (?,?) `;
            con.query(query, [idUser, idMess], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.InsertHiddenmessDB = InsertHiddenmessDB;
function DelHiddenmessDB(idMess) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `DELETE FROM hiddenmesslist WHERE idMess=? `;
            con.query(query, [idMess], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.DelHiddenmessDB = DelHiddenmessDB;
function GetHiddenMessByidMessidUserDB(idMess, idUser) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `SELECT * FROM hiddenmesslist WHERE idUser=? AND idMess=?`;
            con.query(query, [idUser, idMess], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetHiddenMessByidMessidUserDB = GetHiddenMessByidMessidUserDB;
