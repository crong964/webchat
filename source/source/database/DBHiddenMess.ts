import { confi } from "../../confi.js";
import mysql from "mysql"
export function InsertHiddenmessDB(idMess: string, idUser: string) {
    return new Promise((res, error) => {
        let con = mysql.createConnection(confi)
        con.connect((err) => {
            if (err) {
                error(err)
            }
            let query = `INSERT INTO hiddenmesslist(idUser, idMess) VALUES (?,?) `
            con.query(query, [idUser, idMess], (err, rt, fiels) => {
                if (err) {
                    error(err)
                }
                res(rt);
                con.end()
            })
        })
    })
}
export function DelHiddenmessDB(idMess: string) {
    return new Promise((res, error) => {
        let con = mysql.createConnection(confi)
        con.connect((err) => {
            if (err) {
                error(err)
            }
            let query = `DELETE FROM hiddenmesslist WHERE idMess=? `
            con.query(query, [idMess], (err, rt, fiels) => {
                if (err) {
                    error(err)
                }
                res(rt);
                con.end()
            })
        })
    })
}
export function GetHiddenMessByidMessidUserDB(idMess: string, idUser: string) {
    return new Promise((res, error) => {
        let con = mysql.createConnection(confi)
        con.connect((err) => {
            if (err) {
                error(err)
            }
            let query = `SELECT * FROM hiddenmesslist WHERE idUser=? AND idMess=?`
            con.query(query, [idUser, idMess], (err, rt, fiels) => {
                if (err) {
                    error(err)
                }
                res(rt);
                con.end()
            })
        })
    })
}