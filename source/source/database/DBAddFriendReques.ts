import mysql2 from "mysql2";
import { confi } from "../../confi.js";


export function InsertAddFriendRequestDB(idUser: string, idAddFriends: string) {
  return new Promise((res, error) => {
    var con = mysql2.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql =
        "INSERT INTO `listaddfriends`(`idUser`, `idAddFriends`) VALUES (?,?)";
      con.query(sql, [idUser, idAddFriends], (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
        con.end()
      });
    });
  });
}
export function InAddFriendRequestDB(idUser: string, idAddFriends: string) {
  return new Promise((res, error) => {
    var con = mysql2.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql = "SELECT * FROM listaddfriends WHERE idUser=? AND idAddFriends=? ";
      con.query(sql, [idUser, idAddFriends], (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
        con.end()
      });
    });
  });
}

export async function ListAddFriendRequestDB(idUser: string) {
  return new Promise((res, error) => {
    var con = mysql2.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql = "SELECT user.id,user.nameUser,user.avatar,user.birthday,user.sex FROM listaddfriends, user WHERE listaddfriends.idAddFriends=? AND listaddfriends.idUser=user.id";
      con.query(sql, idUser, (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
        con.end()
      });
    });
  });
}

export async function CancelingFriendRequestDB(idFriendRequest: string, idUser: string) {
  return new Promise((res, error) => {
    var con = mysql2.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql = "DELETE FROM listaddfriends WHERE listaddfriends.idUser=? AND listaddfriends.idAddFriends=?";
      con.query(sql, [idFriendRequest, idUser], (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
        con.end()
      });
    });
  });
}



export async function ListSentFriendRequestDB(idUser: string) {
  return new Promise((res, error) => {
    var con = mysql2.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql = "SELECT u.nameUser, u.id,u.avatar,u.sex FROM listaddfriends l, user u WHERE l.idUser = ? AND u.id=l.idAddFriends";
      con.query(sql, idUser, (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
        con.end()
      });
    });
  });
}
export async function GetCountFriendRequestByStatusDB(idAddFriend: string, status: string) {
  return new Promise((res, error) => {
    var con = mysql2.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql = `SELECT COUNT(*) c FROM listaddfriends WHERE status = ? AND idAddFriends = ?`;
       con.query(sql, [status, idAddFriend], (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
        con.end()
      });
      
      
    });
  });
}
export async function UpdateFriendRequestBySeenDB(idAddFriend: string) {
  return new Promise((res, error) => {
    var con = mysql2.createConnection(confi);
    con.connect((err) => {
      if (err) {
        error(err);
      }
      var sql = `UPDATE listaddfriends SET status='1' WHERE idAddFriends =? `;
      con.query(sql, [idAddFriend], (e, ru, field) => {
        if (e) {
          error(e);
        }
        res(ru);
        con.end()
      });
    });
  });
}