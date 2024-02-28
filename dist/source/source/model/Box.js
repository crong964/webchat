export default class Box {
    constructor() {
        this.idBox = "";
        this.idUser = 0;
        this.nameUser = "";
        this.avatar = "";
        this.status = "";
    }
    setAll(p) {
        for (const key in this) {
            this[key] = p[key];
        }
    }
    json() {
        var s = {};
        for (const key in this) {
            const element = this[key];
            if (element != undefined) {
                s[key] = element;
            }
        }
        return s;
    }
}
