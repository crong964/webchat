"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetImageMessByidBoxDB = exports.DelMessByIdDB = exports.GetMessByIdDB = exports.InsertContentInDB = exports.GetAllContentByidBoxDB = void 0;
const confi_js_1 = require("../../confi.js");
const mysql2_1 = __importDefault(require("mysql2"));
function GetAllContentByidBoxDB(idBox, idUser, now) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `
            SELECT * 
            FROM messenge m
            WHERE m.idBox= ? AND m.ngay > (SELECT h.ngay FROM havelistboxchat h WHERE h.idBox = ? AND h.idUser = ? ) AND
            m.idMess NOT IN (SELECT hd.idMess FROM hiddenmesslist hd WHERE hd.idUser = ? ) AND m.ngay < ?
            ORDER BY ngay DESC LIMIT 12`;
            con.query(query, [idBox, idBox, idUser, idUser, now], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetAllContentByidBoxDB = GetAllContentByidBoxDB;
function InsertContentInDB(idBox, idUser, mess, type) {
    type = type || "0";
    return new Promise((res, rej) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = "INSERT INTO messenge ( idBox, content, type,idUser) VALUES (?,?,?,?)";
            con.query(sql, [idBox, mess, type, idUser], (err, rs, fiels) => {
                if (err) {
                    rej(err);
                }
                res(rs);
                con.end();
            });
        });
    });
}
exports.InsertContentInDB = InsertContentInDB;
function GetMessByIdDB(idMess) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `
            SELECT * 
            FROM messenge m
            Where idMess=? `;
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
exports.GetMessByIdDB = GetMessByIdDB;
function DelMessByIdDB(idMess, idUser) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `
            DELETE FROM messenge WHERE idMess = ? AND idUser= ?`;
            con.query(query, [idMess, idUser], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.DelMessByIdDB = DelMessByIdDB;
function GetImageMessByidBoxDB(idBox, idUser, limit) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `
            SELECT * 
            FROM messenge m
            WHERE m.idBox= ? AND m.type= 1 AND m.ngay > (SELECT h.ngay FROM havelistboxchat h WHERE h.idBox = ? AND h.idUser = ? ) AND
            m.idMess NOT IN (SELECT hd.idMess FROM hiddenmesslist hd WHERE hd.idUser = ? ) 
            ORDER BY ngay DESC LIMIT ?,?`;
            con.query(query, [idBox, idBox, idUser, idUser, limit.start, limit.cout], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetImageMessByidBoxDB = GetImageMessByidBoxDB;
