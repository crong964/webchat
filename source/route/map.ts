import { Router } from "express";
import { GetImageFromTomTom, formatNowDateYMDHMS, hash, sercurity } from "../confi.js";
import io from "../server";
import CTMessage from "../source/controller/CTMessage.js";
import CTHavelistboxchat from "../source/controller/CTHavelistboxchat.js";
import Ctvalidateuser from "../source/controller/Ctvalidateuser.js";
import CTBox from "../source/controller/CTBox.js";
import ControllerUser from "../source/controller/CtUsers.js";
import CTAddFriendReques from "../source/controller/CTAddFriendReques.js";

const routeMap = Router()
var ctmessage = new CTMessage();
var cthavelistboxchat = new CTHavelistboxchat();
var ctvalidateuser = new Ctvalidateuser();
var ctbox = new CTBox()
var ctuser = new ControllerUser()
var ctAddFriendReques = new CTAddFriendReques()
interface liveLocation {
    id: string
    idBox: string
    end: string
    sercurity: string
    hash: string
}
interface subscribe {
    idbox: string
    type: "liveLocation" | "shareLocation"
    lng: string,
    lat: string
}
routeMap.post("/subscribe", async (req, res) => {
    var cookie: sercurity = req.cookies;
    const data: subscribe = req.body

    console.log(req.body);


    var idBox = req.body.idbox
    var list = await cthavelistboxchat.GetIdUserOnlineInBox(
        cookie.id,
        idBox
    );

    var s = (new Date()).toDateString()
    var ngay = formatNowDateYMDHMS(s)
    var uuid
    if (data.type == "shareLocation") {
        //https://api.tomtom.com/map/1/staticimage?key=NcCz24AQhyNMZ4h7LAudoLDGBatHcRnb&center=106.8849,10.907
        var content = `chia sẻ vị trí_${data.lng}_${data.lat}`
        try {
            uuid = await GetImageFromTomTom(data.lng, data.lat)

            content = `${uuid}_${data.lng}_${data.lat}`
            
            
        } catch (error) {
            console.log(error);
        }
        console.log(content);
        let v = await Promise.all([
            cthavelistboxchat.visualBoxChat(cookie.id, idBox),
            cthavelistboxchat.SetNotSeenInBox(cookie.id, idBox),
            ctmessage.InsertContentIn(idBox, cookie.id, content, "3"),
            ctbox.UpdateLastMessBox(cookie.id, content, idBox, "shareLocation")
        ]);
        list.forEach((id) => {
            io.in(id.idUser + "").emit("receiveMess", { idMess: v[2].insertId, idFriend: cookie.id, idBox: idBox, content: content, type: "3", ngay: ngay });
        });
        res.json({
            err: false,
            mess: "xong"
        })
        return
    }



    var tg = new Date()
    res.cookie("end", tg.getTime() + 15 * 60 * 1000, {
        httpOnly: true,
    })
    res.cookie("idBox", idBox, {
        httpOnly: true,

    })
    var hashData = hash(cookie.id + cookie.sercurity + idBox, 10)
    res.cookie("hash", hashData, {
        httpOnly: true,
    })

    let v = await Promise.all([
        cthavelistboxchat.visualBoxChat(cookie.id, idBox),
        cthavelistboxchat.SetNotSeenInBox(cookie.id, idBox),
        ctmessage.InsertContentIn(idBox, cookie.id, "chia sẻ vị trí trực tiếp", "2"),
        ctbox.UpdateLastMessBox(cookie.id, "chia sẻ vị trí trực tiếp", idBox, "liveLocation")
    ]);



    list.forEach((id) => {
        io.in(id.idUser + "").emit("receiveMess", { idMess: v[2].insertId, idFriend: cookie.id, idBox: idBox, content: "chia sẻ vị trí trực tiếp", type: "2", ngay: ngay });
    });

    io.to(cookie.id + "").emit("liveLocation", {
        data: true
    })
    res.json({
        err: false
    })
})
routeMap.post("/shareLoction", async (req, res) => {
    var cookie: liveLocation = req.cookies
    var hashData = hash(cookie.id + cookie.sercurity + cookie.idBox, 10)

    if (cookie.hash != hashData) {
        res.json({
            err: false
        })
        return
    }
    var list = await cthavelistboxchat.GetIdUserOnlineInBox(
        cookie.id,
        cookie.idBox
    );
    list.forEach((id) => {
        if ((id.idUser + "") != cookie.id) {
            io.in(id.idUser + "").emit("receiveYourLocation", { lng: req.body.lng, lat: req.body.lat, idFriend: id.idUser });
        }
    });

    res.json({
        err: false
    })
})
routeMap.post("/stopShareLoction", (req, res) => {

    var cookie: sercurity = req.cookies;



    io.to(cookie.id + "").emit("stopShareLoction")

    res.clearCookie("end")
    res.clearCookie("idBox")
    res.clearCookie("hash")
    res.json({
        err: false
    })
})
export default routeMap

