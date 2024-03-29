import { formatDate } from "../../confi.js";
var sex;
(function (sex) {
    sex[sex["nu"] = 0] = "nu";
    sex[sex["nam"] = 1] = "nam";
})(sex || (sex = {}));
export default class User {
    constructor() {
        this.id = 0;
        this.account = "";
        this.nameUser = "";
        this.status = 0;
        this.avatar = "anh";
        this.birthday = "";
        this.sex = "";
    }
    setAll(d) {
        for (const key in this) {
            if (d[key] != undefined) {
                this[key] = d[key];
            }
        }
        if (d.year != undefined) {
            this.birthday = `${d.year}-${d.month}-${d.day}`;
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
        s["account"] = undefined;
        if (s["birthday"]) {
            s["birthday"] = formatDate(s["birthday"]);
        }
        else {
            s["birthday"] = undefined;
        }
        return s;
    }
}
