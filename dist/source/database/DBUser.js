"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdDB = exports.ListUserByNameDB = exports.InsertNewUserDB = exports.GetkUserDatabase = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const confi_js_1 = require("../../confi.js");
function GetkUserDatabase(account) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e);
            }
            var sql = "SELECT * FROM `user` WHERE user.account=?";
            con.query(sql, account, (e, rt, fiels) => {
                if (e) {
                    err(e);
                }
                res(rt);
            });
        });
    });
}
exports.GetkUserDatabase = GetkUserDatabase;
function InsertNewUserDB(p) {
    return new Promise((res, rej) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                rej(e);
            }
            var sql = " INSERT INTO `user`( `account`, `nameUser`, `birthday`, `sex`,`avatar`) VALUES (?,?,?,?,?)";
            con.query(sql, [p.account, p.nameUser, p.birthday, p.sex, p.avatar], (e, rt, fi) => {
                if (e) {
                    rej(e);
                }
                res(true);
                con.end();
            });
        });
    });
}
exports.InsertNewUserDB = InsertNewUserDB;
function ListUserByNameDB(idUser, name) {
    return new Promise((res, rej) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                rej(e);
            }
            var sql = "SELECT u.id,u.nameUser,u.avatar,u.birthday,u.sex FROM user u WHERE u.account LIKE ? and u.id NOT IN (SELECT h.idFriends FROM havelistfriends h WHERE h.idUser = ?) AND u.id <> ?";
            con.query(sql, [`%${name}%`, idUser, idUser], (e, rt, fi) => {
                if (e) {
                    rej(e);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.ListUserByNameDB = ListUserByNameDB;
function GetUserByIdDB(idUser) {
    return new Promise((res, rej) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                rej(e);
            }
            var sql = "SELECT id,nameUser,avatar,birthday,sex FROM user WHERE id= ?";
            con.query(sql, idUser, (e, rt, fi) => {
                if (e) {
                    rej(e);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetUserByIdDB = GetUserByIdDB;
