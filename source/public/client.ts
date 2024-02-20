function postData(url: string, params: {}, cb: Function) {
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(params)
    })
        .then((v) => {
            return v.json()
        })
        .then((v) => {
            cb(v);
        })
}
function postData2(url: string, params: {}, cb: Function) {
    var send = new XMLHttpRequest
    send.onload = (ev) => {
        cb(send.responseText)
    }
    send.open("POST", url)
    send.setRequestHeader("Content-Type", "application/json")
    send.send(JSON.stringify(params))
}

function getData2(url: string, params: {}, cb: Function) {
    var send = new XMLHttpRequest
    send.onload = (ev) => {
        cb(send.responseText)
    }
    send.open("GET", url)
    send.setRequestHeader("Content-Type", "application/json")
    send.send(JSON.stringify(params))
}
var root = document.getElementById("root") as HTMLElement
function render(params: string) {

    root.innerHTML = ""
    root?.append(params)
}


function friendlist() {
    postData2("http://localhost:666/friends/",
        {},
        (data: string) => {
            (document.querySelector(".boxchatlist") as HTMLElement).innerHTML = data
           out()

        })
}


function search(params: HTMLInputElement) {
    if (params.value == "") {
        (document.querySelector(".boxchatlist") as HTMLElement).innerHTML = ""
        return
    }

    postData2("http://localhost:666/friends/search",
        { name: params.value },
        (data: string) => {

            (document.querySelector(".boxchatlist") as HTMLElement).innerHTML = data
        })
}

function addFriendsRequset(params: string) {

    if (!tb()) {
        return
    }
    postData2("http://localhost:666/friends/addFriendsRequset",
        { idFriend: params },
        (data: string) => {
            alert(data)
        })
}
function tb() {
    return confirm("bạn muốn thực thi không")
}




function cacelAddFriendRequest(idFriend: string, doc: string) {
    if (!tb()) {
        return
    }
    postData2("http://localhost:666/friends/cacelAddFriendRequest",
        { idFriend: idFriend },
        (data: string) => {
            alert(data)
            document.querySelector(`.${doc}`)?.remove()
        })
}

function acceptAddFriendRequest(idFriend: string) {
    if (!tb()) {
        return
    }
    postData2("http://localhost:666/friends/acceptAddFriendRequest",
        { idFriend: idFriend },
        (data: string) => {
            alert(data)
        })
}
 
function boxlist() {
    postData2("http://localhost:666/box/",
        {},
        (data: string) => {
            (document.querySelector('.boxchatlist') as HTMLElement).innerHTML = data
            out()
        })
}

function showboxchat(params: string) {
    postData2("http://localhost:666/box/chat",
        { idFriend: params },
        (data: string) => {
            (document.querySelector(".boxchat") as HTMLElement).innerHTML = data
            hidden(".boxchat",".list")
        })
}
function requestfriendlist() {
    postData2("http://localhost:666/friends/listAddFriendRequest",
        {},
        (data: string) => {
            (document.querySelector(".boxchatlist") as HTMLElement).innerHTML = data
            out()
        })
}

function hidden(visual: string, hidden: string) {
   
    if ( window.innerWidth<= 600) {
       

        document.querySelector(visual)?.classList.remove("hidden")
        document.querySelector(visual)?.classList.add("block")

        document.querySelector(hidden)?.classList.remove("block")
        document.querySelector(hidden)?.classList.add("hidden")
    }

} 
function out() {
    hidden(".list",".boxchat")
}

function boxid(idBox: string, idFriend: string) {
    postData2("http://localhost:666/mess/getAllContent",
        { idBox: idBox, idFriend: idFriend },
        (data: string) => {
            (document.querySelector(".boxchat") as HTMLElement).innerHTML = data
            boxscroll()
            ConvertTextToImages()
            hidden(".boxchat",".list")
        })
}
function scrollMess(s: any, idFriend: string, idBox: string) {
    var boxscroll = s as HTMLElement
    var nows = document.getElementById('now') as HTMLInputElement
    if (nows == null) {
        return
    }
    var value = nows.value
    if (boxscroll.scrollTop == 0) {
        postData2("http://localhost:666/mess/getContentSCroll",
            { idBox: idBox, idFriend: idFriend, now: value },
            (data: string) => {
                if (data.length > 0) {
                    nows.remove()
                    var y1 = boxscroll.scrollHeight

                    boxscroll.innerHTML = data + boxscroll.innerHTML
                    var y2 = boxscroll.scrollHeight
                    boxscroll.scrollTo({
                        behavior: "auto",
                        top: y2 - y1
                    })
                    ConvertTextToImages()
                } else {
                    nows = document.getElementById('now') as HTMLInputElement
                }
            })
    }
}

function shownavigate(p: string) {
    var id = `.N${p}`;
    (document.querySelector(id) as HTMLElement).classList.remove('hidden')
}
function hidennaviagte(p: string) {

    var id = `.N${p}`;
    (document.querySelector(id) as HTMLElement).classList.add('hidden')
}
function removemess(idmess: string) {
    if (!tb()) {
        return
    }
    postData("http://localhost:666/mess/remove",
        { idmess: idmess },
        (data: any) => {
            if (!data.err) {
                document.querySelector(`.M${idmess}`)?.remove()
            }

        })
}
function searchuserHTML() {
    getData2("http://localhost:666/friends/searchuser",
        {},
        (data: string) => {
            var f = document.querySelector('.searchHTML') as HTMLElement
            var b = document.querySelector('.mainbody') as HTMLElement
            if (f) {
                b.classList.add('opacity-25')
                f.innerHTML = data
            }

        })
}
function removeSearchUserHTML() {

    var f = document.querySelector('.searchHTML') as HTMLElement
    var b = document.querySelector('.mainbody') as HTMLElement
    if (f) {
        b.classList.remove('opacity-25')
        f.innerHTML = ""
    }
}
function addGroup() {
    getData2("http://localhost:666/box/addGroup",
        {},
        (data: string) => {
            var f = document.querySelector('.searchHTML') as HTMLElement
            var b = document.querySelector('.mainbody') as HTMLElement
            if (f) {
                b.classList.add('opacity-25')
                f.innerHTML = data
            }

        })
}
function SearchUserName() {
    var UserName = document.getElementById("UserName") as HTMLInputElement
    if (UserName.value == "") {
        return
    }
    postData2("http://localhost:666/friends/searchuser",
        { nameUser: UserName.value },
        (data: string) => {
            var kq = document.querySelector(".kq") as HTMLElement
            kq.innerHTML = data
        })
}
async function postFormData2(url: string, params: any, cb: Function) {
    var s = await fetch(url, {
        method: "POST",
        body: params
    })
    var js = await s.json()
    cb(js)

}
function f(file: any) {
    var g = file as HTMLInputElement

    if (g.files?.length) {
        var form = new FormData(document.querySelector(".fileform") as HTMLFormElement)
        postFormData2("http://localhost:666/upload/", form, (d: any) => {
            showmymess(d)
            ConvertTextToImages()
        })
    }

}
function createGroup() {
    var form = new FormData(document.querySelector(".cactv") as HTMLFormElement)
    var s: any = []
    form.forEach((v, k) => {
        s.push(v)
    })
    postData2("http://localhost:666/box/addGroup",
        { ls: s },
        (data: string) => {
            alert(data)

        })

}