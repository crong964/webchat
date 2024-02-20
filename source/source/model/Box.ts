import { UpdateBoxTypeDB } from "../database/DBBox.js"

export default class Box {
    idBox: string
    idUser: number
    nameUser: string
    avatar: string
    imagebox: string
    boxtype: number
    id: number
    content: string
    messType: string
    status: number
    constructor() {
        this.idBox = ""
        this.imagebox = ""
        this.boxtype = 0
        this.idUser = 0
        this.nameUser = ""
        this.avatar = ""
        this.id = 0
        this.content = ""
        this.messType = "mess"
        this.status = 1
    }

    setAll(p: any) {
        for (const key in this) {
            this[key] = p[key]
        }
    }
    json(): any {
        var s: any = {}
        for (const key in this) {
            const element = this[key]
            if (element != undefined) {
                s[key] = element
            }
        }


        return s
    }

}