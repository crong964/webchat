import { postRegister, result } from "../../confi.js";
import { GetkUserDatabase, GetUserByIdDB, InsertNewUserDB, ListUserByNameDB, UpdateUserDB } from "../database/DBUser.js";
import User from "../model/User.js";

export default class ControllerUser {

    rt: result = {
        err: false,
        result: []
    }
    user: User | undefined
    listUser: User[]
    constructor() {
        this.listUser = []
        this.user = undefined
    }
    async GetUser(account: string) {
        this.reFresh()
        await GetkUserDatabase(account)
            .then((v) => {
                this.rt.result = v
            })
            .catch((v) => {
                console.log(v.result);
                this.rt = v;
            })

        for (let i = 0; i < this.rt.result.length; i++) {
            const element = this.rt.result[i];
            this.user = new User()
            this.user.setAll(element)
            break
        }
        return this.user
    }
    async InsertNewUser(p: User) {
        var err = false
        await InsertNewUserDB(p)
            .catch((v) => {
                err = true
                console.log(v)
            })
        return err
    }
    private reFresh() {
        this.rt.err = false
        this.rt.result = []
        this.listUser = []
        this.user = undefined
    }
    private SetlistUser(rt: any) {
        this.reFresh()
        for (let i = 0; i < rt.length; i++) {
            const element = rt[i];
            this.user = new User()
            this.user.setAll(element)
            this.listUser.push(this.user.json());
        }
    }
    async SearchListUserByName(idUser: string, name: string) {
        await ListUserByNameDB(idUser, name)
            .catch((v) => {
                this.reFresh()
                console.log(v);

            })
            .then((v) => {
                this.SetlistUser(v)
            })
        return this.listUser
    }
    async GetUserById(idUser: string) {
        this.reFresh()
        await GetUserByIdDB(idUser)
            .then((v: any) => {
                let s: any[] = v
                if (s.length > 0) {
                    this.user = new User()
                    this.user.setAll(s[0])
                }
            })
            .catch((v) => {
                console.log(v);
            })
        return this.user
    }
    async UpdateUser(p: User) {
        var check = false
        try {
            await UpdateUserDB(p)
            check = true
        } catch (error) {
            console.log(error);
        }
        return check
    }
}