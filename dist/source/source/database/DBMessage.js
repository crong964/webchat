import { confi } from "../../confi.js";
import mysql from "mysql";
export function GetAllContentByidBoxDB(idBox, idUser) {
    return new Promise((res, error) => {
        let con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            let query = `
            SELECT * 
            FROM messenge m
            WHERE m.idBox= ? AND m.ngay > (SELECT h.ngay FROM havelistboxchat h WHERE h.idBox = ? AND h.idUser = ? )
            ORDER BY ngay DESC`;
            con.query(query, [idBox, idBox, idUser], (err, rt, fiels) => {
                if (err) {
                    error(err);
                }
                res(rt);
                con.end();
            });
        });
    });
}
export function InsertContentInDB(idBox, idUser, mess) {
    return new Promise((res, rej) => {
        var con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                rej(err);
            }
            var sql = "INSERT INTO messenge ( idBox, content, type,idUser) VALUES (?,?,0,?)";
            con.query(sql, [idBox, mess, idUser], (err, rs, fiels) => {
                if (err) {
                    rej(err);
                }
                res(rs);
                con.end();
            });
        });
    });
}
