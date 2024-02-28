import User from "./User.js";
export default class temporaryuser extends User {
    constructor() {
        super();
        this.valiCode = "";
        this.password = "";
        this.CreatedTime = new Date();
    }
    setAll(d) {
        super.setAll(d);
    }
    json() {
        return super.json();
    }
}
