export default class BaseModel {
    setAll(d: any) {
        for (const key in this) {
            if (d[key] != undefined) {
                this[key] = d[key];
            }
        }
    }
    json() {
        var s: any = {};
        for (const key in this) {
            const element = this[key];
            if (element != undefined) {
                s[key] = element;
            }
        }
        return s;
    }
}