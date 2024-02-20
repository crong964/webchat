import { formatDate, formatNowDateYMDHMS } from "../../confi.js";
export enum typeMess {
  content = "0",
  image = "1"
}
export default class message {

  idBox: string;
  idUser: number;
  content: string;
  type: string;
  idMess: number;
  ngay: string;
  constructor() {
    this.idBox = ""
    this.idUser = 0
    this.content = ""
    this.type = typeMess.content
    this.idMess = 0
    this.ngay = ""
  }
  setAll(d: any) {
    for (const key in this) {
      this[key] = d[key];
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
    if (s["ngay"]) {
      s["ngay"] = formatNowDateYMDHMS(s["ngay"])
    }

    
    return s;
  }
}
