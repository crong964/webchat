"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMenberInGroupDB = exports.GetAllMenberInChatGroupDB = exports.UpdateMenberInGroupDB = exports.GetHaveListidBoxByIdUserDB = exports.SetNotSeenInBoxDB = exports.IsIdUserInBoxDB = exports.GetIdUserOnlineInBoxDB = exports.InsertIdToNewBoxDB = exports.GetIdBoxbyIdUserAndIdFriendDB = exports.UpdateStatusBox = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const confi_js_1 = require("../../confi.js");
const CTHavelistboxchat_js_1 = require("../controller/CTHavelistboxchat.js");
function UpdateStatusBox(idUser, idBox, status) {
    return new Promise((res, rel) => {
        let con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((err) => {
            if (err) {
                rel(err);
            }
            let sql = "";
            if (status == CTHavelistboxchat_js_1.statusBox.Hidden) {
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
exports.UpdateStatusBox = UpdateStatusBox;
function GetIdBoxbyIdUserAndIdFriendDB(idUser, idFriend) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = "SELECT h.*, us.* FROM havelistboxchat h, user us WHERE h.idUser=? AND h.idFriend=? AND us.id=h.idFriend";
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
exports.GetIdBoxbyIdUserAndIdFriendDB = GetIdBoxbyIdUserAndIdFriendDB;
function InsertIdToNewBoxDB(idUser, idBox, idFriend, admin) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `INSERT INTO havelistboxchat
        (idBox, idUser, status,idFriend,admin) 
        VALUES (?,?,0,?,?)`;
            con.query(sql, [idBox, idUser, idFriend, admin], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.InsertIdToNewBoxDB = InsertIdToNewBoxDB;
function GetIdUserOnlineInBoxDB(idBox, idUser) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `SELECT h.idUser
      FROM havelistboxchat h, validateuser v
      WHERE  h.idBox LIKE ? AND h.idUser=v.id AND v.status >= 0
      GROUP BY h.idUser`;
            con.query(sql, [idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetIdUserOnlineInBoxDB = GetIdUserOnlineInBoxDB;
function IsIdUserInBoxDB(idUser, idBox) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
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
exports.IsIdUserInBoxDB = IsIdUserInBoxDB;
function SetNotSeenInBoxDB(idUser, idBox) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `
      UPDATE havelistboxchat 
      SET status = 2
      WHERE idUser <> ? AND idBox = ?`;
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
exports.SetNotSeenInBoxDB = SetNotSeenInBoxDB;
function GetHaveListidBoxByIdUserDB(idUser, idBox) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `
      SELECT * FROM havelistboxchat WHERE idUser=? AND idBox=? `;
            var s = con.query(sql, [idUser, idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetHaveListidBoxByIdUserDB = GetHaveListidBoxByIdUserDB;
function UpdateMenberInGroupDB(idUser, idBox, menberType) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `
      UPDATE havelistboxchat SET admin=?  WHERE idUser=? AND idBox=? `;
            con.query(sql, [menberType, idUser, idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.UpdateMenberInGroupDB = UpdateMenberInGroupDB;
function GetAllMenberInChatGroupDB(idUser, idBox) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `
      SELECT u.nameUser,u.avatar,hb.*
      FROM havelistboxchat hb, user u
      WHERE hb.idFriend = u.id AND hb.idUser <> ? AND idBox= ? `;
            var s = con.query(sql, [idUser, idBox], (e, rt, fiels) => {
                if (e) {
                    err(e.message);
                }
                res(rt);
                con.end();
            });
        });
    });
}
exports.GetAllMenberInChatGroupDB = GetAllMenberInChatGroupDB;
function DeleteMenberInGroupDB(idUser, idBox) {
    return new Promise((res, err) => {
        var con = mysql2_1.default.createConnection(confi_js_1.confi);
        con.connect((e) => {
            if (e) {
                err(e.message);
            }
            var sql = `
      DELETE FROM havelistboxchat WHERE idUser =? AND idBox =? `;
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
exports.DeleteMenberInGroupDB = DeleteMenberInGroupDB;
