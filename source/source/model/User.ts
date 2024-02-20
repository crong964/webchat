import { formatDate, formatNowDateYMDHMS } from "../../confi.js";

enum sex {
  nu = 0,
  nam,
}
export default class User {
  id: number;
  account: string;
  nameUser: string;
  status: number;
  avatar: string;
  sex: string;
  birthday: string | undefined;
  constructor() {
    this.id = 0;
    this.account = "";
    this.nameUser = "";
    this.status = 0;
    this.avatar = "anh";
    this.birthday = "";
    this.sex = "";
  }
  setAll(d: any) {
    for (const key in this) {
      if (d[key] != undefined) {
        this[key] = d[key];
      }
    }
    if (d.year != undefined) {
      this.birthday = `${d.year}-${d.month}-${d.day}`
    }
  }
  json() {
    var s: any = {};
    for (const key in this) {
      const element = this[key];
      if (element != undefined) {
        s[key] = element;
      }
    }
    s["account"] = undefined
    if (s["birthday"]) {
      s["birthday"] = formatNowDateYMDHMS(s["birthday"]);
    } else {
      s["birthday"] = undefined
    }
    return s;
  }
}
