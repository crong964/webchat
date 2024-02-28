export default class Account {
    constructor() {
        this.account = "",
            this.password = "";
    }
    setAll(d) {
        this.account = d.account ? d.account : undefined;
        this.password = d.password ? d.password : undefined;
        return this;
    }
    getAccount() {
        return this.account;
    }
    getPassword() {
        return this.password;
    }
    setAccount(v) {
        this.account = v;
    }
    setPassord(v) {
        this.password = v;
    }
    json() {
        var s = {};
        for (const key in this) {
            if (Object.hasOwnProperty.call(this, key)) {
                const element = this[key];
                if (element != undefined) {
                    s[key] = this[key];
                }
            }
        }
    }
}
