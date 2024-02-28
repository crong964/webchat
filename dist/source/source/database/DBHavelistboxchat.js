import mysql from "mysql";
import { confi } from "../../confi.js";
import { statusBox } from "../controller/CTHavelistboxchat.js";
export function UpdateStatusBox(idUser, idBox, status) {
    return new Promise((res, rel) => {
        let con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                rel(err);
            }
            let sql = "";
            if (status == statusBox.hidden) {
                sql = `UPDATE havelistboxchat 
                SET status= ? , ngay=CURRENT_TIMESTAMP
                WHERE idUser = ? AND idBox = ?`;
            }
            else {
                sql = `UPDATE havelistboxchat 
                SET status= ?
                WHERE idUser = ? AND idBox = ?`;
            }
            con.query(sql, [status, idUser, idBox], (e, rt, fiels) => {
                if (err) {
                    rel(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
export function GetIdBoxbyIdUserAndIdFriendDB(idUser, idFriend) {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = "SELECT h1.idBox FROM havelistboxchat h1, havelistboxchat h2 WHERE h1.idUser=? AND h2.idUser=? AND h1.idBox=h2.idBox";
            con.query(sql, [idUser, idFriend], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
export function InsertIdToNewBoxDB(idUser, idBox) {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `INSERT INTO havelistboxchat
        (idBox, idUser, status) 
        VALUES (?,?,'0')`;
            con.query(sql, [idBox, idUser], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
export function GetIdUserOnlineInBoxDB(idBox, idUser) {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `SELECT h.idUser
      FROM havelistboxchat h, validateuser v
      WHERE h.idUser NOT LIKE ? AND h.idBox LIKE ? AND h.idUser=v.id AND v.status >= 0
      GROUP BY h.idUser`;
            con.query(sql, [idUser, idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
export function IsIdUserInBoxDB(idUser, idBox) {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `SELECT idUser 
      FROM havelistboxchat 
      WHERE idUser LIKE ? AND idBox LIKE ?`;
            con.query(sql, [idUser, idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
export function SetNotSeenInBoxDB(idUser, idBox) {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `
      UPDATE havelistboxchat 
      SET status = 2
      WHERE idUser NOT LIKE ? AND idBox LIKE ?`;
            con.query(sql, [idUser, idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
