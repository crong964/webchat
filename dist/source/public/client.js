"use strict";
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
        cb(JSON.stringify(v));
    });
}
var root = document.getElementById("root");
function render(params) {
    root === null || root === void 0 ? void 0 : root.innerHTML = "";
    root === null || root === void 0 ? void 0 : root.append(params);
}
var listAddFriendRequest = document.getElementById("FriendsList");
listAddFriendRequest === null || listAddFriendRequest === void 0 ? void 0 : listAddFriendRequest.addEventListener("click", () => {
    postData("http://localhost:666/friends/", {}, (data) => {
        render(data);
    });
});
var findNameFriends = document.getElementById("findNameFriends");
var submitFindNameFriends = document.getElementById("submitFindNameFriends");
submitFindNameFriends === null || submitFindNameFriends === void 0 ? void 0 : submitFindNameFriends.addEventListener("click", () => {
    var n = findNameFriends === null || findNameFriends === void 0 ? void 0 : findNameFriends.value;
    postData("http://localhost:666/friends/search", { name: n }, (data) => {
        render(data);
    });
});
var idFriend = document.getElementById("idFriend");
var submitIdFriend = document.getElementById("submitIdFriend");
submitIdFriend === null || submitIdFriend === void 0 ? void 0 : submitIdFriend.addEventListener("click", () => {
    var id = idFriend === null || idFriend === void 0 ? void 0 : idFriend.value;
    postData("http://localhost:666/friends/addFriendsRequset", { idFriend: id }, (data) => {
        render(data);
    });
});
var listAddFriendRequest = document.getElementById("listAddFriendRequest");
listAddFriendRequest === null || listAddFriendRequest === void 0 ? void 0 : listAddFriendRequest.addEventListener("click", () => {
    postData("http://localhost:666/friends/listAddFriendRequest", {}, (data) => {
        render(data);
    });
});
var CacelAddFriendRequest = document.getElementById("CacelAddFriendRequest");
var SubmitCacelAddFriendRequest = document.getElementById("SubmitCacelAddFriendRequest");
SubmitCacelAddFriendRequest === null || SubmitCacelAddFriendRequest === void 0 ? void 0 : SubmitCacelAddFriendRequest.addEventListener("click", () => {
    var n = CacelAddFriendRequest === null || CacelAddFriendRequest === void 0 ? void 0 : CacelAddFriendRequest.value;
    postData("http://localhost:666/friends/cacelAddFriendRequest", { idFriend: n }, (data) => {
        root === null || root === void 0 ? void 0 : root.append(data);
    });
});
var AcceptAddFriendRequest = document.getElementById("AcceptAddFriendRequest");
var SubmitAcceptAddFriendRequest = document.getElementById("SubmitAcceptAddFriendRequest");
SubmitAcceptAddFriendRequest === null || SubmitAcceptAddFriendRequest === void 0 ? void 0 : SubmitAcceptAddFriendRequest.addEventListener("click", () => {
    var n = AcceptAddFriendRequest === null || AcceptAddFriendRequest === void 0 ? void 0 : AcceptAddFriendRequest.value;
    postData("http://localhost:666/friends/acceptAddFriendRequest", { idFriend: n }, (data) => {
        root === null || root === void 0 ? void 0 : root.append(data);
    });
});
var SubmitBoxChatList = document.getElementById("SubmitBoxChatList");
SubmitBoxChatList === null || SubmitBoxChatList === void 0 ? void 0 : SubmitBoxChatList.addEventListener("click", () => {
    postData("http://localhost:666/box/", {}, (data) => {
        render(data);
    });
});
var cancelFriends = document.getElementById("cancelFriends");
var SubmitCancelFriends = document.getElementById("SubmitCancelFriends");
SubmitCancelFriends === null || SubmitCancelFriends === void 0 ? void 0 : SubmitCancelFriends.addEventListener("click", () => {
    var n = cancelFriends === null || cancelFriends === void 0 ? void 0 : cancelFriends.value;
    postData("http://localhost:666/friends/cancelFriends", { idFriend: n }, (data) => {
        render(data);
    });
});
var HiddenBoxChat = document.getElementById("HiddenBoxChat");
var SubmitHiddenBoxChat = document.getElementById("SubmitHiddenBoxChat");
SubmitHiddenBoxChat === null || SubmitHiddenBoxChat === void 0 ? void 0 : SubmitHiddenBoxChat.addEventListener("click", () => {
    var n = HiddenBoxChat === null || HiddenBoxChat === void 0 ? void 0 : HiddenBoxChat.value;
    postData("http://localhost:666/box/hiddenBoxChat", { idBox: n }, (data) => {
        render(data);
    });
});
var Chat = document.getElementById("Chat");
var SubmitChat = document.getElementById("SubmitChat");
SubmitChat === null || SubmitChat === void 0 ? void 0 : SubmitChat.addEventListener("click", () => {
    var n = Chat === null || Chat === void 0 ? void 0 : Chat.value;
    postData("http://localhost:666/box/chat", { idFriend: n }, (data) => {
        render(data);
    });
});
var SubmitSentFriendRequest = document.getElementById("SubmitSentFriendRequest");
SubmitSentFriendRequest === null || SubmitSentFriendRequest === void 0 ? void 0 : SubmitSentFriendRequest.addEventListener("click", () => {
    postData("http://localhost:666/friends/sentFriendRequest", {}, (data) => {
        render(data);
    });
});
var GetContentInBox = document.getElementById("GetContentInBox");
var SubMitGetContentInBox = document.getElementById("SubMitGetContentInBox");
SubMitGetContentInBox === null || SubMitGetContentInBox === void 0 ? void 0 : SubMitGetContentInBox.addEventListener("click", () => {
    var n = GetContentInBox === null || GetContentInBox === void 0 ? void 0 : GetContentInBox.value;
    postData("http://localhost:666/mess/getAllContent", { idBox: n }, (data) => {
        render(data);
    });
});
