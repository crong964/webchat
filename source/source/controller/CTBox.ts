import { getAllBoxByIdInBD, GetBoxbyIdBoxDB, GetEmptyBoxDB, insertNewBoxDB, UpdateBoxTypeDB, UpdateLastMessBoxDB } from "../database/DBBox.js";
import Box from "../model/Box.js";
enum type {
  noFriend = "0",
  Friend = "1"
}
enum boxtype {
  friend = "0",
  nofriend = "1",
  group = "2"
}
export default class CTBox {
  lsBox: Box[];


  gettype() {
    return type
  }
  constructor() {
    this.lsBox = [];
  }
  private Refesh() {
    this.lsBox = [];
  }
  async getAllBoxByIdUser(idUser: string) {
    await getAllBoxByIdInBD(idUser)
      .catch((v) => {
        console.log(v);
      })
      .then((v) => {

        this.setlsBox(v as []);
      });
    return true;
  }
  async insertNewBox(type: "friend" | "nofriend" | "group") {

    var check: any
    try {
      check = await insertNewBoxDB(boxtype[type])
    }
    catch (e) {
      console.log(e);
    }
    return check["insertId"]
  }

  private setlsBox(any: []) {
    this.Refesh();
    this.lsBox = [];
    let box: Box;
    for (let i = 0; i < any.length; i++) {
      const element = any[i];
      box = new Box();
      box.setAll(element);
      this.lsBox.push(box);
    }
  }
  async UpdateBoxType(idBox: string, type: string) {
    await UpdateBoxTypeDB(idBox, type)
      .catch((v) => {
        console.log(v)
      })
    return true
  }
  async GetEmptyBox() {
    await GetEmptyBoxDB()
      .then((v) => {
        this.setlsBox(v as [])
      })
    return this.lsBox
  }
  async UpdateLastMessBox(idUser: string, content: string, idBox: string, type: "mess" | "image" | "liveLocation" | "shareLocation") {
    var check
    try {
      check = await UpdateLastMessBoxDB(idUser, content, idBox, type)
    } catch (error) {
      console.log(error);

    }
    return check
  }
  async GetBoxbyIdBox(idBox: string) {
    var box: Box | undefined
    try {
      var ls = await GetBoxbyIdBoxDB(idBox) as []
      for (let i = 0; i < ls.length; i++) {
        const element = ls[i];
        box = new Box()
        box.setAll(element)
        break
      }
    } catch (error) {
      console.log(error);
      
    }
    return box;
  }
}
