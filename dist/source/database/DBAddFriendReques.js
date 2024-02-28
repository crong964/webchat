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
exports.UpdateFriendRequestBySeenDB = exports.GetCountFriendRequestByStatusDB = exports.ListSentFriendRequestDB = exports.CancelingFriendRequestDB = exports.ListAddFriendRequestDB = exports.InAddFriendRequestDB = exports.InsertAddFriendRequestDB = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const confi_js_1 = require("../../confi.js");
function InsertAddFriendRequestDB(idUser, idAddFriends) {
    return new Promise((res, error) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = "INSERT INTO `listaddfriends`(`idUser`, `idAddFriends`) VALUES (?,?)";
            con.query(sql, [idUser, idAddFriends], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                res(ru);
                con.end();
            });
        });
    });
}
exports.InsertAddFriendRequestDB = InsertAddFriendRequestDB;
function InAddFriendRequestDB(idUser, idAddFriends) {
    return new Promise((res, error) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = "SELECT * FROM listaddfriends WHERE idUser=? AND idAddFriends=? ";
            con.query(sql, [idUser, idAddFriends], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                res(ru);
                con.end();
            });
        });
    });
}
exports.InAddFriendRequestDB = InAddFriendRequestDB;
function ListAddFriendRequestDB(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, error) => {
            var con = mysql2_1.default.createConnection(confi_js_1.confi);
            con.connect((err) => {
                if (err) {
                    error(err);
                }
                var sql = "SELECT user.id,user.nameUser,user.avatar,user.birthday,user.sex FROM listaddfriends, user WHERE listaddfriends.idAddFriends=? AND listaddfriends.idUser=user.id";
                con.query(sql, idUser, (e, ru, field) => {
                    if (e) {
                        error(e);
                    }
                    res(ru);
                    con.end();
                });
            });
        });
    });
}
exports.ListAddFriendRequestDB = ListAddFriendRequestDB;
function CancelingFriendRequestDB(idFriendRequest, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, error) => {
            var con = mysql2_1.default.createConnection(confi_js_1.confi);
            con.connect((err) => {
                if (err) {
                    error(err);
                }
                var sql = "DELETE FROM listaddfriends WHERE listaddfriends.idUser=? AND listaddfriends.idAddFriends=?";
                con.query(sql, [idFriendRequest, idUser], (e, ru, field) => {
                    if (e) {
                        error(e);
                    }
                    res(ru);
                    con.end();
                });
            });
        });
    });
}
exports.CancelingFriendRequestDB = CancelingFriendRequestDB;
function ListSentFriendRequestDB(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, error) => {
            var con = mysql2_1.default.createConnection(confi_js_1.confi);
            con.connect((err) => {
                if (err) {
                    error(err);
                }
                var sql = "SELECT u.nameUser, u.id,u.avatar,u.sex FROM listaddfriends l, user u WHERE l.idUser = ? AND u.id=l.idAddFriends";
                con.query(sql, idUser, (e, ru, field) => {
                    if (e) {
                        error(e);
                    }
                    res(ru);
                    con.end();
                });
            });
        });
    });
}
exports.ListSentFriendRequestDB = ListSentFriendRequestDB;
function GetCountFriendRequestByStatusDB(idAddFriend, status) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, error) => {
            var con = mysql2_1.default.createConnection(confi_js_1.confi);
            con.connect((err) => {
                if (err) {
                    error(err);
                }
                var sql = `SELECT COUNT(*) c FROM listaddfriends WHERE status = ? AND idAddFriends = ?`;
                con.query(sql, [status, idAddFriend], (e, ru, field) => {
                    if (e) {
                        error(e);
                    }
                    res(ru);
                    con.end();
                });
            });
        });
    });
}
exports.GetCountFriendRequestByStatusDB = GetCountFriendRequestByStatusDB;
function UpdateFriendRequestBySeenDB(idAddFriend) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, error) => {
            var con = mysql2_1.default.createConnection(confi_js_1.confi);
            con.connect((err) => {
                if (err) {
                    error(err);
                }
                var sql = `UPDATE listaddfriends SET status='1' WHERE idAddFriends =? `;
                con.query(sql, [idAddFriend], (e, ru, field) => {
                    if (e) {
                        error(e);
                    }
                    res(ru);
                    con.end();
                });
            });
        });
    });
}
exports.UpdateFriendRequestBySeenDB = UpdateFriendRequestBySeenDB;
