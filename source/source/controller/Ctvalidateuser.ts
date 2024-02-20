import {
  DeleteValidateAllDB,
  DeleteValidateDB,
  GetValidateUserBD,
  InsertValidateuserBD,
  UpdateStatusInValidateuserBD,
  
} from "../database/DBvalidateuser.js";

import validateuser from "../model/Validateuser.js";

export default class CTvalidateuser {
  listValidateuser: validateuser[];
  constructor() {
    this.listValidateuser = [];
  }
  async InsertValidateuser(p: validateuser) {
    var rt: boolean = true;
    await InsertValidateuserBD(p)
      .catch((v) => {
        console.log(v);
        rt = false;
      })
      .then((v) => {
        console.log(v);
      });
    return rt;
  }
  async UpdateStatusInValidateuser(id: string, status: number) {
    var rt: boolean = true;
    await UpdateStatusInValidateuserBD(id, status).catch((v) => {
      console.log(v);
      rt = false;
    });
    return rt;
  }
  async DeleteValidate(id: string, sercurity: string) {
    var rt: boolean = true;
    await DeleteValidateDB(id, sercurity).catch((v) => {
      console.log(v);
      rt = false;
    });
    return rt;
  }
  async DeleteValidateAll(id: string) {
    var rt: boolean = true;

    await DeleteValidateAllDB(id).catch((v) => {
      console.log(v);
      rt = false;
    });
    return rt;
  }
  async GetValidateUser(id: string, cookie: string) {
    var rt: any = [];
    var validatedate: validateuser | undefined = undefined;
    await GetValidateUserBD(id, cookie)
      .then((v) => {
        rt = v;
      })
      .catch((v) => {
        validatedate = undefined;
      });
    for (let i = 0; i < rt.length; i++) {
      const element = rt[i];
      validatedate = new validateuser();
      validatedate.setAll(element);
    }
    return validatedate;
  }
}
