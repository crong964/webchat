import {
  IsFriendInListDB,
  GetHaveListFriendsByIdUserDB,
  SearchFirendsByIdDB,
  SearchFirendsByNameDB,
  insertListFriendsDB,
  CancelFriendsDB,
} from "../database/DBHaveListFriends.js";
import HaveListFriends from "../model/HaveListFriends.js";

export default class CTHaveListFriends {
  HaveListFriends: HaveListFriends[];
  constructor() {
    this.HaveListFriends = [];
  }
  private refesh() {
    this.HaveListFriends = [];
  }
  private SetHaveListFriends(rt: any) {
    this.refesh();
    let havelistfriends: HaveListFriends;
    for (let i = 0; i < rt.length; i++) {
      const element = rt[i];
      havelistfriends = new HaveListFriends();
      havelistfriends.setAll(element);
      this.HaveListFriends.push(havelistfriends.json());
    }
  }
  async GetHaveListFriendsByIdUser(idUser: string) {
    await GetHaveListFriendsByIdUserDB(idUser)
      .catch((v) => {
        console.log(v);
        this.HaveListFriends = [];
      })
      .then((v) => {
        this.SetHaveListFriends(v);
      });
    return this.HaveListFriends;
  }
  async SearchFirendsById(id: string) {
    await SearchFirendsByIdDB(id)
      .catch((v) => {
        this.refesh();
        console.log(v);
      })
      .then((v) => {
        this.SetHaveListFriends(v);
      });
    return this.HaveListFriends;
  }
  async SearchFirendsByName(iduser: string, name: string) {
    await SearchFirendsByNameDB(iduser, name)
      .catch((v) => {
        this.refesh();
        console.log(v);
      })
      .then((v) => {
        this.SetHaveListFriends(v);
      });
    return this.HaveListFriends;
  }
  async IsFriendInList(idUser: string, idFriend: string) {
    var check: boolean = false;
    await IsFriendInListDB(idUser, idFriend)
      .then((v) => {
        var s: any = v;
        if (s.length > 0) {
          check = true;
        } else {
          check = false;
        }
      })
      .catch((v) => {
        check = true;
        console.log(v);
      });
    return check;
  }
  async insertListFriends(idUser: string, idFriend: string) {
    var s = false;
    await insertListFriendsDB(idUser, idFriend)
      .catch((v) => {
        console.log(v);
      })
      .then((v) => {
        s = true;
      });
    return s;
  }
  async  CancelFriends(idUser:string,idFriend:string) {
    var s=true
    await CancelFriendsDB(idUser,idFriend)
    .catch((v)=>{
      s=false
      console.log(v)
    })
    .then((v)=>{
      s=true
    })
    return s
  }
}
