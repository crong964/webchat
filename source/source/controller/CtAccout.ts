import { result } from "../../confi.js";
import { GetAccoutByNameDatabase, GetAccoutDatabase, InsertAccountDB, UpdatePasswordDB } from "../database/DBAccount.js"
import Account from "../model/Account.js";

export default class ctAccout {
    rt: result = {
        err: false,
        result: []
    }
    account: Account | undefined
    listAccount: Account[]
    constructor() {
        this.listAccount = []
        this.account = undefined
    }
    async GetAccout(s: Account) {
        this.Refesh();
        await GetAccoutDatabase(s)
            .then((v) => {
                this.rt.result = v

            })
            .catch((v: result) => {
                console.log(v.result);
                this.rt = v;
            })
        for (let i = 0; i < this.rt.result.length; i++) {
            const element = this.rt.result[i];
            this.account = new Account()
            this.account.setAll(element)
            break
        }
        return this.account
    }
    async InsertAccount(s: Account) {
        var check =true
        await InsertAccountDB(s)
            .catch((v) => {
                console.log(v);
                this.rt = v;
                check=false
            })
            
        return check
    }
    private Refesh() {
        this.listAccount = []
        this.account = undefined
    }
    async UpdatePassword(account: string, password: string) {
        var check = true;
        await UpdatePasswordDB(account, password)
            .then((v) => {

            })
            .catch((v) => {
                console.log(v);
                check = false
            })
        return check
    }
    async GetAccoutByName(account: string) {
        var g
        try {
            var l = await GetAccoutByNameDatabase(account) as []
            for (let i = 0; i < l.length; i++) {
                const element = l[i];
                g = new Account()
                g.setAll(element)
                break
            }
        } catch (error) {
            console.log(error);
            g = undefined
        }
        return g
    }
}