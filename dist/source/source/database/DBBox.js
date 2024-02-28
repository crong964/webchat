import mysql from "mysql";
import { confi } from "../../confi.js";
export function getAllBoxByIdInBD(idUser) {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = "SELECT hb2.idBox,hb2.idUser,us.nameUser,us.avatar,hb2.status FROM havelistboxchat hb1, havelistboxchat hb2, user us WHERE hb1.idUser= ? AND hb2.idUser <> ? AND hb1.idBox=hb2.idBox AND us.id=hb2.idUser AND hb1.status <> 0";
            con.query(sql, [idUser, idUser], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
export function insertNewBoxDB() {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = "INSERT INTO `boxchat`(`idbox`) VALUES ('[value-1]')";
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
export function UpdateBoxTypeDB(idBox, type) {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
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
export function GetEmptyBoxDB() {
    return new Promise((res, err) => {
        var con = mysql.createConnection(confi);
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
