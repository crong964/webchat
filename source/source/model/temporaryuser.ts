import User from "./User.js";

export default class temporaryuser extends User{
    password:string
    valiCode:string
    CreatedTime:Date
    constructor(){
        super();
        this.valiCode=""
        this.password=""
        this.CreatedTime= new Date();
    }
    setAll(d: any): void {
        super.setAll(d);
    }

    json() {
       return super.json()
    }
}