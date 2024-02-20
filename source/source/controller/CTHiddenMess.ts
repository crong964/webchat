import { DelHiddenmessDB, GetHiddenMessByidMessidUserDB, InsertHiddenmessDB } from "../database/DBHiddenMess.js";
import HiddenMess from "../model/HiddenMess.js";

export class CTHiddenMess {
    constructor() {

    }
    async InsertHiddenmess(idMess: string, idUser: string) {
        var f
        try {
            await InsertHiddenmessDB(idMess, idUser)
            f = true
        } catch (error) {
            f = false
            console.log(error);
        }
        return f
    }
    async DelHiddenMess(idMess: string) {
        var f
        try {
            await DelHiddenmessDB(idMess)
            f = true
        } catch (error) {
            f = false
            console.log(error);
        }
        return f
    }
    async GetHiddenMessByidMessidUser(idMess: string, idUser: string) {
        var f = undefined
        try {
            var l = await GetHiddenMessByidMessidUserDB(idMess, idUser) as []
            for (let i = 0; i < l.length; i++) {
                const element = l[i];
                f = new HiddenMess()
                f.setAll(element)
            }
        } catch (error) {

            console.log(error);
        }
        return f
    }
}