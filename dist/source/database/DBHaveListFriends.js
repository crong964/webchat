"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelFriendsDB = exports.insertListFriendsDB = exports.IsFriendInListDB = exports.SearchFirendsByNameDB = exports.SearchFirendsByIdDB = exports.GetHaveListFriendsByIdUserDB = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const confi_js_1 = require("../../confi.js");
function GetHaveListFriendsByIdUserDB(id) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = "SELECT u.id,u.nameUser,u.avatar,u.birthday,u.sex FROM havelistfriends h,user u WHERE h.idUser=? AND h.idFriends=u.id";
            con.query(query, id, (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetHaveListFriendsByIdUserDB = GetHaveListFriendsByIdUserDB;
function SearchFirendsByIdDB(id) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = "SELECT * FROM `user` WHERE user.id=? ";
            con.query(query, id, (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.SearchFirendsByIdDB = SearchFirendsByIdDB;
function SearchFirendsByNameDB(iduser, name) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `SELECT * FROM user u, havelistfriends h WHERE h.idUser = ? and h.idFriends = u.id AND u.nameUser LIKE ?`;
            con.query(query, [iduser, `%${name}%`, iduser], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.SearchFirendsByNameDB = SearchFirendsByNameDB;
function IsFriendInListDB(idUser, idFriend) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `SELECT * FROM havelistfriends where idUser=? and idFriends=?`;
            con.query(query, [idUser, idFriend], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.IsFriendInListDB = IsFriendInListDB;
function insertListFriendsDB(idUser, idFriend) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `INSERT INTO havelistfriends(idUser, idFriends) VALUES (?,?)`;
            con.query(query, [idUser, idFriend], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.insertListFriendsDB = insertListFriendsDB;
function CancelFriendsDB(idUser, idFriend) {
    return new Promise((res, error) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `DELETE FROM havelistfriends WHERE idUser = ? AND idFriends = ?`;
            con.query(query, [idUser, idFriend], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.CancelFriendsDB = CancelFriendsDB;
