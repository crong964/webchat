import { formatDate } from "../../confi.js";
export var typeMess;
(function (typeMess) {
    typeMess["content"] = "0";
    typeMess["image"] = "1";
})(typeMess || (typeMess = {}));
export default class message {
    constructor() {
        this.idBox = "";
        this.idUser = "";
        this.content = "";
        this.type = typeMess.content;
        this.idMess = "";
        this.ngay = "";
    }
    setAll(d) {
        for (const key in this) {
            this[key] = d[key];
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
        if (s["ngay"]) {
            s["ngay"] = formatDate(s["ngay"]);
        }
        if (this.type == typeMess.content) {
            s["type"] == 0;
        }
        return s;
    }
}
