import User from "./User.js";

export default class AddFriendRequest extends User{
    constructor(){
        super()
    }
    json():User {
        return super.json();
    }
    setAll(d: any): void {
        super.setAll(d)
    }
}