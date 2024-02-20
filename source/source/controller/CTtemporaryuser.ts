import temporaryuser from "../model/temporaryuser.js";
import { hash } from "../../confi.js";

export default class CTtemporaryuser {
  list: any;
  constructor() {
    this.list = {};
  }
  InsertNew(tem: temporaryuser) {
    if (this.list[tem.account] != undefined) {
      return false;
    }
    this.list[tem.account] = tem;

    return true;
  }

  getTemporaryuser(account: string): temporaryuser {
    return this.list[account];
  }

  fillter() {
    return new Promise((res, rej) => {
      var date = new Date();
      for (const key in this.list) {
        let temporaryuser:temporaryuser=this.list[key]
        if (date.getTime()-temporaryuser.CreatedTime.getTime() >= 60000) {
            delete this.list[key]
        }
      }
    });
  }
  getAll(){
    for (const key in this.list) {
        let temporaryuser:temporaryuser=this.list[key]
        console.log(temporaryuser);
      }
  }
  removeTemporaryuser(account: string) {
    delete this.list[account];
  }
}
