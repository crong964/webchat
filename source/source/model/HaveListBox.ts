import BaseModel from "./BaseModel"

export default class HaveListBox extends BaseModel {
    idUser: number
    idBox: number
    admin: number
    avatar: string
    nameUser: string
    constructor() {
        super()
        this.admin = -2
        this.idBox = -2
        this.idUser = 0
        this.avatar = ""
        this.nameUser = ""
    }
}