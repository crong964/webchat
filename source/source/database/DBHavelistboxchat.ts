import mysql2 from "mysql2";
import { confi } from "../../confi.js";
import { statusBox } from "../controller/CTHavelistboxchat.js";

export function UpdateStatusBox(idUser: string, idBox: string, status: string) {
  return new Promise((res, rel) => {
    let con = mysql2.createConnection(confi);
    con.connect((err) => {
      if (err) {
        rel(err);
      }
      let sql = "";
      if (status == statusBox.Hidden) {
        sql = `UPDATE havelistboxchat 
                SET status= ? , ngay=CURRENT_TIMESTAMP
                WHERE idUser = ? AND idBox = ?`;
      } else {
        sql = `UPDATE havelistboxchat 
                SET status= ?
                WHERE idUser = ? AND idBox = ?`;
      }
      con.query(sql, [status, idUser, idBox], (e, rt, fiels) => {
        if (err) {
          rel(err);
        }
        res(rt);
        con.end()
      });
    });
  });
}
export function GetIdBoxbyIdUserAndIdFriendDB(
  idUser: string,
  idFriend: string
) {
  return new Promise((res, err) => {


    var con = mysql2.createConnection(confi);
    con.connect((e) => {
      if (e) {
        err(e.message);
      }
      var sql =
        "SELECT h.*, us.* FROM havelistboxchat h, user us WHERE h.idUser=? AND h.idFriend=? AND us.id=h.idFriend";
      con.query(sql, [idUser, idFriend], (e, rt, fiels) => {
        if (e) {
          err(e.message);
        }
        res(rt);
        con.end()
      });
    });
  });
}
export function InsertIdToNewBoxDB(idUser: string, idBox: string, idFriend: string, admin: string) {
  return new Promise((res, err) => {
    var con = mysql2.createConnection(confi);
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
        con.end()
      });
    });
  });
}
export function GetIdUserOnlineInBoxDB(idBox: string, idUser: string) {
  return new Promise((res, err) => {
    var con = mysql2.createConnection(confi);
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



        con.end()
      });
    });
  });
}

export function IsIdUserInBoxDB(idUser: string, idBox: string) {
  return new Promise((res, err) => {
    var con = mysql2.createConnection(confi);
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
        con.end()
      });
    });
  });
}

export function SetNotSeenInBoxDB(idUser: string, idBox: string) {
  return new Promise((res, err) => {
    var con = mysql2.createConnection(confi);
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
        con.end()
      });
    });
  });
}
export function GetHaveListidBoxByIdUserDB(idUser: string, idBox: string) {
  return new Promise((res, err) => {
    var con = mysql2.createConnection(confi);
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
        con.end()
      });
    });
  });
}

export function UpdateMenberInGroupDB(idUser: string, idBox: string, menberType: string) {
  return new Promise((res, err) => {
    var con = mysql2.createConnection(confi);
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
        con.end()
      });
    });
  });
}

export function GetAllMenberInChatGroupDB(idUser: string, idBox: string) {
  return new Promise((res, err) => {
    var con = mysql2.createConnection(confi);
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
        con.end()


      });
    });
  });
}

export function DeleteMenberInGroupDB(idUser: string, idBox: string) {
  return new Promise((res, err) => {
    var con = mysql2.createConnection(confi);
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
        con.end()
      });
    });
  });
}