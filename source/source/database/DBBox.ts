import mysql2 from "mysql2"
import { confi } from "../../confi.js"

export function getAllBoxByIdInBD(idUser: string) {
    return new Promise((res, err) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                err(e.message)
            }
            var sql = `SELECT u.nameUser,u.avatar,idFriend as "idUser", bc.content,bc.id,bc.idBox,u.avatar,bc.boxtype,bc.messType, hb.status
            FROM havelistboxchat hb, boxchat bc , user u
            WHERE hb.idUser=? AND hb.idBox=bc.idBox AND u.id=hb.idFriend AND hb.status <> 0
            ORDER BY bc.updateDay DESC; `
            var s = con.query(sql, [idUser], (e, rt, fiels) => {
                if (e) {
                    err(e.message)
                }
                res(rt);
                con.end()
            })


        })
    })
}
export function insertNewBoxDB(boxtype: string) {
    return new Promise((res, err) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                err(e.message)
            }
            var sql = "INSERT INTO `boxchat`(`boxtype`) VALUES (?)"
            con.query(sql, boxtype, (e, rt, fiels) => {
                if (e) {
                    err(e.message)
                }
                res(rt);
                con.end()
            })
        })
    })
}
export function UpdateBoxTypeDB(idBox: string, type: string) {
    return new Promise((res, err) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                err(e.message)
            }
            var sql = "UPDATE boxchat SET type= ? WHERE idbox= ?"
            con.query(sql, [type, idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message)
                }
                res(rt);
                con.end()
            })
        })
    })
}
export function GetEmptyBoxDB() {
    return new Promise((res, err) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                err(e.message)
            }
            var sql = "SELECT idBox FROM boxchat WHERE idBox NOT IN (SELECT idBox FROM havelistboxchat GROUP BY idBox) LIMIT 1"
            con.query(sql, (e, rt, fiels) => {
                if (e) {
                    err(e.message)
                }
                res(rt);
                con.end()
            })
        })
    })
}
export function UpdateLastMessBoxDB(idUser: string, content: string, idBox: string, type: "mess" | "image" | "liveLocation" | "shareLocation") {
    return new Promise((res, err) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                err(e.message)
            }
            var sql = "UPDATE boxchat SET content=?,id=?, updateDay=CURRENT_TIMESTAMP, messType=?  WHERE idBox =?"
            con.query(sql, [content, idUser, type, idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message)
                }
                res(rt);
                con.end()
            })
        })
    })
}
export function GetBoxbyIdBoxDB(idBox: string) {
    return new Promise((res, err) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                err(e.message)
            }
            var sql = `SELECT * FROM boxchat WHERE idBox= ? `
            var s = con.query(sql, [idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message)
                }
                res(rt);
                con.end()
            })


        })
    })
}



