import mysql2 from "mysql2"
import { confi } from "../../confi.js"
import User from "../model/User"
export function GetkUserDatabase(account: string) {
    return new Promise((res, err) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                err(e)
            }
            var sql: string = "SELECT * FROM `user` WHERE user.account=?"
            con.query(sql, account, (e, rt, fiels) => {
                if (e) {
                    err(e)
                }
                res(rt);
            })
        })
    })
}
export function InsertNewUserDB(p: User) {
    return new Promise((res, rej) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                rej(e)
            }
            var sql = " INSERT INTO `user`( `account`, `nameUser`, `birthday`, `sex`,`avatar`) VALUES (?,?,?,?,?)"
            con.query(sql, [p.account, p.nameUser, p.birthday, p.sex, p.avatar], (e, rt, fi) => {
                if (e) {
                    rej(e)
                }
                res(true);
                con.end()
            })
        })
    })
}

export function ListUserByNameDB(idUser: string, name: string) {
    return new Promise((res, rej) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                rej(e)
            }
            var sql = "SELECT u.id,u.nameUser,u.avatar,u.birthday,u.sex FROM user u WHERE u.account LIKE ? and u.id NOT IN (SELECT h.idFriends FROM havelistfriends h WHERE h.idUser = ?) AND u.id <> ?"

            con.query(sql, [`%${name}%`, idUser, idUser], (e, rt, fi) => {
                if (e) {
                    rej(e)
                }
                res(rt);
                con.end()
            })
        })
    })
}
export function GetUserByIdDB(idUser: string) {
    return new Promise((res, rej) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                rej(e)
            }
            var sql = "SELECT id,nameUser,avatar,birthday,sex FROM user WHERE id= ?"

            con.query(sql, idUser, (e, rt, fi) => {
                if (e) {
                    rej(e)
                }
                res(rt);
                con.end()
            })
        })
    })
}
export function UpdateUserDB(p: User) {
    return new Promise((res, rej) => {
        var con = mysql2.createConnection(confi)
        con.connect((e) => {
            if (e) {
                rej(e)
            }
            var sql = ` UPDATE user SET nameUser= ?, sex= ?, birthday=?   WHERE id= ? `
            var s = con.query(sql, [p.nameUser, p.sex, p.birthday, p.id], (e, rt, fi) => {
                if (e) {
                    rej(e)
                }
                res(true);
                con.end()
            })
        })
    })
}