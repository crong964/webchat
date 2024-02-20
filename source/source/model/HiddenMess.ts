import BaseModel from "./BaseModel.js";

export default class HiddenMess extends BaseModel {
    idUser: string;
    idMess: string;

    constructor() {
        super();
        this.idUser = ""
        this.idMess = ""
    }
}