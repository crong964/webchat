export default class Account {
    account: string
    password: string
    constructor() {
        this.account = ""
        this.password = ""
    }
    public setAll(d: any) {
        this.account = d.account ? d.account : undefined
        this.password = d.password ? d.password : undefined
        return this
    }
    public getAccount(): string {
        return this.account;
    }
    public getPassword(): string {
        return this.password;
    }

    public setAccount(v: string) {
        this.account = v;
    }
    public setPassord(v: string) {
        this.password = v;
    }
    public json() {
        var s: any = {}
        for (const key in this) {
            if (Object.hasOwnProperty.call(this, key)) {
                const element = this[key];
                if (element != undefined) {
                    s[key] = this[key]
                }

            }
        }
    }
}