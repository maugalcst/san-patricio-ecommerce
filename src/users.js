"use strict";

class User {
    constructor(options) {
        this.id = 0;
        this.rank = "user";
        this.name = '';
        this.lastname = '';
        this.email = '';
        this.phone = 0;
        this.date = 0;
        this.address = {};
        Object.assign(this, options);
    }
    fullname() {
        return this.name + ' ' + this.lastname;
    }
    regdate() {
        let result="";
        var d = this.date;
        result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
        return result;        
    }
}
exports.User = User;