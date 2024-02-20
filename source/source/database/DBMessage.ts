import { confi, limit } from "../../confi.js";
import mysql from "mysql"

export function GetAllContentByidBoxDB(idBox: string, idUser: string, now: string) {
    return new Promise((res, error) => {
        let con = mysql.createConnection(confi)
        con.connect((err) => {
            if (err) {
                error(err)
            }
            let query = `
            SELECT * 
            FROM messenge m
            WHERE m.idBox= ? AND m.ngay > (SELECT h.ngay FROM havelistboxchat h WHERE h.idBox = ? AND h.idUser = ? ) AND
            m.idMess NOT IN (SELECT hd.idMess FROM hiddenmesslist hd WHERE hd.idUser = ? ) AND m.ngay < ?
            ORDER BY ngay DESC LIMIT 12`
            con.query(query, [idBox, idBox, idUser, idUser, now], (err, rt, fiels) => {
                if (err) {
                    error(err)
                }
                res(rt);
                con.end()
            })
        })
    })
}
export function InsertContentInDB(idBox: string, idUser: string, mess: string, type?: string) {
    type = type || "0"
    return new Promise((res, rej) => {
        var con = mysql.createConnection(confi)
        con.connect((err) => {
            if (err) {
                rej(err)
            }
            var sql = "INSERT INTO messenge ( idBox, content, type,idUser) VALUES (?,?,?,?)"
            con.query(sql, [idBox, mess, type, idUser], (err, rs, fiels) => {
                if (err) {
                    rej(err)
                }
                res(rs)
                con.end()
            })
        })
    })
}
export function GetMessByIdDB(idMess: string) {
    return new Promise((res, error) => {
        let con = mysql.createConnection(confi)
        con.connect((err) => {
            if (err) {
                error(err)
            }
            let query = `
            SELECT * 
            FROM messenge m
            Where idMess=? `
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
export function DelMessByIdDB(idMess: string, idUser: string) {
    return new Promise((res, error) => {
        let con = mysql.createConnection(confi)
        con.connect((err) => {
            if (err) {
                error(err)
            }
            let query = `
            DELETE FROM messenge WHERE idMess = ? AND idUser= ?`
            con.query(query, [idMess, idUser], (err, rt, fiels) => {
                if (err) {
                    error(err)
                }
                res(rt);
                con.end()
            })
        })
    })
}

export function GetImageMessByidBoxDB(idBox: string, idUser: string, limit: limit) {
    return new Promise((res, error) => {
        let con = mysql.createConnection(confi)
        con.connect((err) => {
            if (err) {
                error(err)
            }
            let query = `
            SELECT * 
            FROM messenge m
            WHERE m.idBox= ? AND m.type= 1 AND m.ngay > (SELECT h.ngay FROM havelistboxchat h WHERE h.idBox = ? AND h.idUser = ? ) AND
            m.idMess NOT IN (SELECT hd.idMess FROM hiddenmesslist hd WHERE hd.idUser = ? ) 
            ORDER BY ngay DESC LIMIT ?,?`
            con.query(query, [idBox, idBox, idUser, idUser, limit.start, limit.cout], (err, rt, fiels) => {
                if (err) {
                    error(err)
                }
                res(rt);
                con.end()
            })
        })
    })
}