export default class CTtemporaryuser {
    constructor() {
        this.list = {};
    }
    InsertNew(tem) {
        if (this.list[tem.account] != undefined) {
            return false;
        }
        this.list[tem.account] = tem;
        return true;
    }
    getTemporaryuser(account) {
        return this.list[account];
    }
    fillter() {
        return new Promise((res, rej) => {
            var date = new Date();
            for (const key in this.list) {
                let temporaryuser = this.list[key];
                if (date.getTime() - temporaryuser.CreatedTime.getTime() >= 60000) {
                    delete this.list[key];
                }
            }
        });
    }
    getAll() {
        for (const key in this.list) {
            let temporaryuser = this.list[key];
            console.log(temporaryuser);
        }
    }
    removeTemporaryuser(account) {
        delete this.list[account];
    }
}
