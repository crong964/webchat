import { formatDate, formatNowDateYMDHMS, limit } from "../../confi.js";
import { ip } from "../../server.js";
import {
  DelMessByIdDB,
  GetAllContentByidBoxDB,
  GetImageMessByidBoxDB,
  GetMessByIdDB,
  InsertContentInDB,
} from "../database/DBMessage.js";
import message from "../model/message.js";

export default class CTMessage {
  listMess: message[];
  constructor() {
    this.listMess = [];
  }
  async GetAllContentByidBox(idBox: string, idUser: string, day?: string) {
    day = day || formatNowDateYMDHMS(new Date().toISOString())


    await GetAllContentByidBoxDB(idBox, idUser, day)
      .then((v: any) => {
        this.setlsMess(v);
      })
      .catch((v) => {
        console.log(v);

      });
    return this.listMess;
  }
  private Refesh() {
    this.listMess = [];
  }
  private setlsMess(any: []) {
    this.Refesh();
    let mess: message;
    for (let i = 0; i < any.length; i++) {
      const element = any[i];
      mess = new message();
      mess.setAll(element);
      this.listMess.push(mess.json());
    }
  }
  async InsertContentIn(idBox: string, idUser: string, mess: string, type?: string) {
    var check: any
    await InsertContentInDB(idBox, idUser, mess, type)
      .then((v) => {
        check = v
      })
      .catch((v) => {
        console.log(v);
        check = undefined
      });
    return check;
  }
  async GetMessById(idMess: string) {
    var mess: message | undefined
    try {
      var l = await GetMessByIdDB(idMess) as []
      for (let i = 0; i < l.length; i++) {
        const e = l[i];
        mess = new message()
        mess.setAll(e)
        break
      }
    } catch (error) {
      console.log(error);
    }
    return mess
  }
  async DelMessById(idMess: string, idUser: string) {
    var mess: message | undefined
    try {
      var l = await DelMessByIdDB(idMess, idUser) as []
      for (let i = 0; i < l.length; i++) {
        const e = l[i];
        mess = new message()
        mess.setAll(e)
        break
      }
    } catch (error) {
      console.log(error);
    }
    return mess
  }
  async GetImageMessByidBox(idBox: string, idUser: string, limit: limit) {
    var list: string[] = []
    try {
      var c = await GetImageMessByidBoxDB(idBox, idUser, limit) as []
      for (let i = 0; i < c.length; i++) {
        const element = c[i];
        let mess = new message()
        mess.setAll(element)
        var l = mess.content.split(" ").map((v) => {
          return `${ip}/v`
        })
        list.push(...l);
      }
    } catch (error) {
      console.log(error);
    }
    return list
  }
}
