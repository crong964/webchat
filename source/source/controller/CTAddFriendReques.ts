import {
  CancelingFriendRequestDB,
  GetCountFriendRequestByStatusDB,
  InAddFriendRequestDB,
  InsertAddFriendRequestDB,
  ListAddFriendRequestDB,
  ListSentFriendRequestDB,
  UpdateFriendRequestBySeenDB,
} from "../database/DBAddFriendReques.js";
import AddFriendRequest from "../model/AddFriendRequest.js";
enum statusRequest {
  NotSeen = "0",
  Seen = "1",
}
export default class CTAddFriendReques {
  addFriendsList: AddFriendRequest[];
  constructor() {
    this.addFriendsList = [];
  }
  private refesh() {
    this.addFriendsList = [];
  }
  private setList(s: any) {
    this.refesh();
    let addFriendRequest: AddFriendRequest;
    for (let i = 0; i < s.length; i++) {
      const element = s[i];
      addFriendRequest = new AddFriendRequest();
      addFriendRequest.setAll(element);
      this.addFriendsList.push(addFriendRequest.json());
    }
  }
  async InAddFriendRequest(idUser: string, idAddFriends: string) {
    let check: boolean = false;
    await InAddFriendRequestDB(idUser, idAddFriends)
      .then((v) => {
        let s: any = v;
        if (s.length > 0) {
          check = true;
        } else {
          check = false;
        }
      })
      .catch((v) => {
        console.log(v);
        check = true;
      });
    return check;
  }
  async InsertAddFriendRequest(idUser: string, idAddFriends: string) {
    var check: boolean = false;
    await InsertAddFriendRequestDB(idUser, idAddFriends)
      .then((v) => {
        check = true;
      })
      .catch((v) => {
        check = false;
      });
    return check;
  }
  async ListAddFriendRequest(idUser: string) {
    var s: any;
    s = await ListAddFriendRequestDB(idUser);
    this.setList(s);
    return this.addFriendsList;
  }
  async CancelingFriendRequest(idFriendRequest: string, idUser: string) {
    var s = false
    await CancelingFriendRequestDB(idFriendRequest, idUser)
      .then((v) => {
        s = true
      })
      .catch((v) => {
        console.log(v)
        s = false
      })
    return s
  }
  async ListSentFriendRequest(idUser: string) {
    await ListSentFriendRequestDB(idUser)
      .then((v: any) => {
        this.setList(v)
      })
      .catch((v) => {
        console.log(v)
      })
    return this.addFriendsList
  }
  async GetCountFriendRequestByStatus(idAddFriend: string, status: "Seen" | "NotSeen") {
    var s = statusRequest[status]
    var check = 0;
    try {
      var ls = await GetCountFriendRequestByStatusDB(idAddFriend, s) as any[]

      for (let i = 0; i < ls.length; i++) {
        const element = ls[i];
        check = element.c
        break
      }
    } catch (error) {
      console.log(error);

    }
    return check
  }
  async UpdateFriendRequestBySeen(idAddFriend: string) {
    var check = true
    try {

      await UpdateFriendRequestBySeenDB(idAddFriend)

    } catch (error) {
      console.log(error);
      check = false
    }
    return check
  }
}