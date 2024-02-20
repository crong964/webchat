"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function postData(url, params, cb) {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(params)
    })
        .then((v) => {
        return v.json();
    })
        .then((v) => {
        cb(v);
    });
}
function postData2(url, params, cb) {
    var send = new XMLHttpRequest;
    send.onload = (ev) => {
        cb(send.responseText);
    };
    send.open("POST", url);
    send.setRequestHeader("Content-Type", "application/json");
    send.send(JSON.stringify(params));
}
function getData2(url, params, cb) {
    var send = new XMLHttpRequest;
    send.onload = (ev) => {
        cb(send.responseText);
    };
    send.open("GET", url);
    send.setRequestHeader("Content-Type", "application/json");
    send.send(JSON.stringify(params));
}
var root = document.getElementById("root");
function render(params) {
    root.innerHTML = "";
    root === null || root === void 0 ? void 0 : root.append(params);
}
function friendlist() {
    postData2("http://localhost:666/friends/", {}, (data) => {
        document.querySelector(".boxchatlist").innerHTML = data;
        out();
    });
}
function search(params) {
    if (params.value == "") {
        document.querySelector(".boxchatlist").innerHTML = "";
        return;
    }
    postData2("http://localhost:666/friends/search", { name: params.value }, (data) => {
        document.querySelector(".boxchatlist").innerHTML = data;
    });
}
function addFriendsRequset(params) {
    if (!tb()) {
        return;
    }
    postData2("http://localhost:666/friends/addFriendsRequset", { idFriend: params }, (data) => {
        alert(data);
    });
}
function tb() {
    return confirm("bạn muốn thực thi không");
}
function cacelAddFriendRequest(idFriend, doc) {
    if (!tb()) {
        return;
    }
    postData2("http://localhost:666/friends/cacelAddFriendRequest", { idFriend: idFriend }, (data) => {
        var _a;
        alert(data);
        (_a = document.querySelector(`.${doc}`)) === null || _a === void 0 ? void 0 : _a.remove();
    });
}
function acceptAddFriendRequest(idFriend) {
    if (!tb()) {
        return;
    }
    postData2("http://localhost:666/friends/acceptAddFriendRequest", { idFriend: idFriend }, (data) => {
        alert(data);
    });
}
function boxlist() {
    postData2("http://localhost:666/box/", {}, (data) => {
        document.querySelector('.boxchatlist').innerHTML = data;
        out();
    });
}
function showboxchat(params) {
    postData2("http://localhost:666/box/chat", { idFriend: params }, (data) => {
        document.querySelector(".boxchat").innerHTML = data;
        hidden(".boxchat", ".list");
    });
}
function requestfriendlist() {
    postData2("http://localhost:666/friends/listAddFriendRequest", {}, (data) => {
        document.querySelector(".boxchatlist").innerHTML = data;
        out();
    });
}
function hidden(visual, hidden) {
    var _a, _b, _c, _d;
    if (window.innerWidth <= 600) {
        (_a = document.querySelector(visual)) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
        (_b = document.querySelector(visual)) === null || _b === void 0 ? void 0 : _b.classList.add("block");
        (_c = document.querySelector(hidden)) === null || _c === void 0 ? void 0 : _c.classList.remove("block");
        (_d = document.querySelector(hidden)) === null || _d === void 0 ? void 0 : _d.classList.add("hidden");
    }
}
function out() {
    hidden(".list", ".boxchat");
}
function boxid(idBox, idFriend) {
    postData2("http://localhost:666/mess/getAllContent", { idBox: idBox, idFriend: idFriend }, (data) => {
        document.querySelector(".boxchat").innerHTML = data;
        boxscroll();
        ConvertTextToImages();
        hidden(".boxchat", ".list");
    });
}
function scrollMess(s, idFriend, idBox) {
    var boxscroll = s;
    var nows = document.getElementById('now');
    if (nows == null) {
        return;
    }
    var value = nows.value;
    if (boxscroll.scrollTop == 0) {
        postData2("http://localhost:666/mess/getContentSCroll", { idBox: idBox, idFriend: idFriend, now: value }, (data) => {
            if (data.length > 0) {
                nows.remove();
                var y1 = boxscroll.scrollHeight;
                boxscroll.innerHTML = data + boxscroll.innerHTML;
                var y2 = boxscroll.scrollHeight;
                boxscroll.scrollTo({
                    behavior: "auto",
                    top: y2 - y1
                });
                ConvertTextToImages();
            }
            else {
                nows = document.getElementById('now');
            }
        });
    }
}
function shownavigate(p) {
    var id = `.N${p}`;
    document.querySelector(id).classList.remove('hidden');
}
function hidennaviagte(p) {
    var id = `.N${p}`;
    document.querySelector(id).classList.add('hidden');
}
function removemess(idmess) {
    if (!tb()) {
        return;
    }
    postData("http://localhost:666/mess/remove", { idmess: idmess }, (data) => {
        var _a;
        if (!data.err) {
            (_a = document.querySelector(`.M${idmess}`)) === null || _a === void 0 ? void 0 : _a.remove();
        }
    });
}
function searchuserHTML() {
    getData2("http://localhost:666/friends/searchuser", {}, (data) => {
        var f = document.querySelector('.searchHTML');
        var b = document.querySelector('.mainbody');
        if (f) {
            b.classList.add('opacity-25');
            f.innerHTML = data;
        }
    });
}
function removeSearchUserHTML() {
    var f = document.querySelector('.searchHTML');
    var b = document.querySelector('.mainbody');
    if (f) {
        b.classList.remove('opacity-25');
        f.innerHTML = "";
    }
}
function addGroup() {
    getData2("http://localhost:666/box/addGroup", {}, (data) => {
        var f = document.querySelector('.searchHTML');
        var b = document.querySelector('.mainbody');
        if (f) {
            b.classList.add('opacity-25');
            f.innerHTML = data;
        }
    });
}
function SearchUserName() {
    var UserName = document.getElementById("UserName");
    if (UserName.value == "") {
        return;
    }
    postData2("http://localhost:666/friends/searchuser", { nameUser: UserName.value }, (data) => {
        var kq = document.querySelector(".kq");
        kq.innerHTML = data;
    });
}
function postFormData2(url, params, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        var s = yield fetch(url, {
            method: "POST",
            body: params
        });
        var js = yield s.json();
        cb(js);
    });
}
function f(file) {
    var _a;
    var g = file;
    if ((_a = g.files) === null || _a === void 0 ? void 0 : _a.length) {
        var form = new FormData(document.querySelector(".fileform"));
        postFormData2("http://localhost:666/upload/", form, (d) => {
            showmymess(d);
            ConvertTextToImages();
        });
    }
}
function createGroup() {
    var form = new FormData(document.querySelector(".cactv"));
    var s = [];
    form.forEach((v, k) => {
        s.push(v);
    });
    postData2("http://localhost:666/box/addGroup", { ls: s }, (data) => {
        alert(data);
    });
}
