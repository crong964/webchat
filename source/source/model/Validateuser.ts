enum status {
  offline = 0,
  online = 1,
}
export default class Validateuser {
   id: number;
   cookie: string;
   socket: string;
   status: status;
   ab:string
   time:number
  constructor() {
    this.time=0
    this.id = 0
    this.cookie = "";
    this.socket = "";
    this.status = 1;
    this.ab=""
  }
  public setAll(p: any) {
    for (const key in this) {
      this[key] = p[key];
    }
  }
  public Json() {
    var s: any = {};
    for (const key in this) {
      const element = this[key];
      if (element!=undefined) {
        s[key] = element;
      }
    }
    return s;
  }
}
