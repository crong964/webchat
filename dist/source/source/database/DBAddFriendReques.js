var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mysql from "mysql";
import { confi } from "../../confi.js";
export function InsertAddFriendRequestDB(idUser, idAddFriends) {
    return new Promise((res, error) => {
        var con = mysql.createConnection(confi);
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
export function InAddFriendRequestDB(idUser, idAddFriends) {
    return new Promise((res, error) => {
        var con = mysql.createConnection(confi);
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
export function ListAddFriendRequestDB(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, error) => {
            var con = mysql.createConnection(confi);
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
export function CancelingFriendRequestDB(idFriendRequest, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, error) => {
            var con = mysql.createConnection(confi);
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
export function ListSentFriendRequestDB(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res, error) => {
            var con = mysql.createConnection(confi);
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
