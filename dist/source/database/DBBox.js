"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBoxbyIdBoxDB = exports.UpdateLastMessBoxDB = exports.GetEmptyBoxDB = exports.UpdateBoxTypeDB = exports.insertNewBoxDB = exports.getAllBoxByIdInBD = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const confi_js_1 = require("../../confi.js");
function getAllBoxByIdInBD(idUser) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `SELECT u.nameUser,u.avatar,idFriend as "idUser", bc.content,bc.id,bc.idBox,u.avatar,bc.boxtype,bc.messType, hb.status
            FROM havelistboxchat hb, boxchat bc , user u
            WHERE hb.idUser=? AND hb.idBox=bc.idBox AND u.id=hb.idFriend AND hb.status <> 0
            ORDER BY bc.updateDay DESC; `;
            var s = con.query(sql, [idUser], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.getAllBoxByIdInBD = getAllBoxByIdInBD;
function insertNewBoxDB(boxtype) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = "INSERT INTO `boxchat`(`boxtype`) VALUES (?)";
            con.query(sql, boxtype, (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.insertNewBoxDB = insertNewBoxDB;
function UpdateBoxTypeDB(idBox, type) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = "UPDATE boxchat SET type= ? WHERE idbox= ?";
            con.query(sql, [type, idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.UpdateBoxTypeDB = UpdateBoxTypeDB;
function GetEmptyBoxDB() {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = "SELECT idBox FROM boxchat WHERE idBox NOT IN (SELECT idBox FROM havelistboxchat GROUP BY idBox) LIMIT 1";
            con.query(sql, (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetEmptyBoxDB = GetEmptyBoxDB;
function UpdateLastMessBoxDB(idUser, content, idBox, type) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = "UPDATE boxchat SET content=?,id=?, updateDay=CURRENT_TIMESTAMP, messType=?  WHERE idBox =?";
            con.query(sql, [content, idUser, type, idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.UpdateLastMessBoxDB = UpdateLastMessBoxDB;
function GetBoxbyIdBoxDB(idBox) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `SELECT * FROM boxchat WHERE idBox= ? `;
            var s = con.query(sql, [idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetBoxbyIdBoxDB = GetBoxbyIdBoxDB;
