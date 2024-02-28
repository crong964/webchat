import { confi } from "../../confi.js";
import mysql from "mysql";
export function GetAccoutDatabase(p) {
    return new Promise((res, error) => {
        var con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = "SELECT * FROM `account` WHERE account.account=? AND account.password=?";
            con.query(sql, [p.getAccount(), p.getPassword()], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                else {
                    res(ru);
                }
                con.end();
            });
        });
    });
}
export function InsertAccountDB(p) {
    return new Promise((res, error) => {
        var con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = "INSERT INTO `account`(`account`, `password`) VALUES (?,?)";
            con.query(sql, [p.getAccount(), p.getPassword()], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                else {
                    res(ru);
                }
                con.end();
            });
        });
    });
}
export function UpdatePasswordDB(account, password) {
    return new Promise((res, error) => {
        var con = mysql.createConnection(confi);
        con.connect((err) => {
            if (err) {
                error(err);
            }
            var sql = `UPDATE account SET password = ? WHERE account = ?`;
            con.query(sql, [password, account], (e, ru, field) => {
                if (e) {
                    error(e);
                }
                else {
                    res(ru);
                }
                con.end();
            });
        });
    });
}
