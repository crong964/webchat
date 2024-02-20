import {
  DeleteMenberInGroupDB,
  GetAllMenberInChatGroupDB,
  GetHaveListidBoxByIdUserDB,
  GetIdBoxbyIdUserAndIdFriendDB,
  GetIdUserOnlineInBoxDB,
  InsertIdToNewBoxDB,
  IsIdUserInBoxDB,
  SetNotSeenInBoxDB,
  UpdateMenberInGroupDB,
  UpdateStatusBox,
} from "../database/DBHavelistboxchat.js";
import Box from "../model/Box.js";
import HaveListBox from "../model/HaveListBox.js";
import User from "../model/User.js";
export enum statusBox {
  Hidden = "0",
  Seen = "1",
  Unread = "2"
}
export enum menberType {
  notMenber = "-1",
  Menber = "0",
  extraAdmin = "2"
}
export default class CTHavelistboxchat {
  listBox: Box[];

  constructor() {
    this.listBox = [];
  }
  async hiddenBoxChat(idUser: string, idBox: string) {
    var s = false;
    await UpdateStatusBox(idUser, idBox, statusBox.Hidden)
      .then((v: any) => {
        if (v.changedRows == 1) {
          s = true;
        }
      })
      .catch((v) => {
        console.log(v);
      });
    return s;
  }
  async GetIdBoxbyIdUserAndIdFriend(idUser: string, idFriend: string) {
    await GetIdBoxbyIdUserAndIdFriendDB(idUser, idFriend)
      .then((v) => {
        this.setlsBox(v as []);
      })
      .catch((v) => {
        console.log(v);
        this.Refesh();
      });
    return this.listBox;
  }
  private setlsBox(any: []) {
    this.Refesh();

    let box: Box;
    for (let i = 0; i < any.length; i++) {
      const element = any[i];
      box = new Box();
      box.setAll(element);
      this.listBox.push(box.json());
    }
  }
  private Refesh() {
    this.listBox = [];
  }
  async InsertIdToNewBox(idUser: string, idBox: string, idFriend: string, admin?: string) {
    idFriend = idFriend || idUser
    admin = admin || "0"
    await InsertIdToNewBoxDB(idUser, idBox, idFriend, admin)
      .then((v) => { })
      .catch((v) => {
        console.log("ok");
        console.log(v);
      });
    return true;
  }
  async visualBoxChat(idUser: string, idBox: string) {
    var s = false;
    await UpdateStatusBox(idUser, idBox, statusBox.Seen)
      .then((v: any) => {
        s = true;
      })
      .catch((v) => {
        console.log(v);
      });
    return s;
  }
  async GetIdUserOnlineInBox(idUser: string, idBox: string) {
    await GetIdUserOnlineInBoxDB(idBox, idUser).then((v: any) => {
      this.setlsBox(v);
    }).catch((v) => {
      console.log(v);

    })
    return this.listBox;
  }
  async IsIdUserInBox(idUser: string, idBox: string) {
    let check: boolean = false;
    await IsIdUserInBoxDB(idUser, idBox)
      .then((v: any) => {
        if (v.length > 0) {
          check = true;
        }
      })
      .catch((v) => {
        console.log(v);
      });
    return check;
  }
  async SetNotSeenInBox(idUser: string, idBox: string) {
    let check = false;
    await SetNotSeenInBoxDB(idUser, idBox)
      .then((v: any) => {
        if (v.changedRows > 0) {
          check = true
        }
      })
      .catch((v) => {
        console.log(v)
      })
    return check
  }
  async GetHaveListidBoxByIdUser(idUser: string, idBox: string) {
    let check;
    try {
      var ls = await GetHaveListidBoxByIdUserDB(idUser, idBox) as []
      for (let i = 0; i < ls.length; i++) {
        const element = ls[i];
        check = new HaveListBox()
        check.setAll(element)
        break
      }

    } catch (error) {
      console.log(error);
    }

    return check
  }
  async DeleteMenberInGroup(idUser: string, idBox: string) {
    let check;
    try {
      await DeleteMenberInGroupDB(idUser, idBox)
      check = true
    } catch (error) {
      check = false
      console.log(error);
    }
    return check
  }
  async UpLevelMenberInGroup(idUser: string, idBox: string) {
    let check;
    try {
      await UpdateMenberInGroupDB(idUser, idBox, menberType.extraAdmin)
      check = true
    } catch (error) {
      check = false
      console.log(error);
    }
    return check
  }
  async GetAllMenberInChatGroup(idUser: string, idBox: string) {
    var userL: HaveListBox[] = []
    try {
      var ls = await GetAllMenberInChatGroupDB(idUser, idBox) as []
      for (let i = 0; i < ls.length; i++) {
        const element = ls[i];
        var temp = new HaveListBox()
        temp.setAll(element)
        userL.push(temp)
      }
    } catch (error) {
      console.log(error);
    }
    return userL
  }
}
