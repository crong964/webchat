import { Router } from "express";
import { sercurity } from "../confi.js";

import CTBox from "../source/controller/CTBox.js";
import CTHavelistboxchat from "../source/controller/CTHavelistboxchat.js";
import CTMessage from "../source/controller/CTMessage.js";
import CTHaveListFriends from "../source/controller/CThaveLsitFriend.js";
import CtUer from "../source/controller/CtUsers.js"
import HaveListBox from "../source/model/HaveListBox.js";

var ctHaveListFriends = new CTHaveListFriends()
var ctBox = new CTBox();
var ctMessage = new CTMessage();
var ctHavelistboxchat = new CTHavelistboxchat();
var ctUer = new CtUer();
const routeGroupBox = Router()


routeGroupBox.use(async (req, res, next) => {
    var box = await ctBox.GetBoxbyIdBox(req.body.idBox)
    if (box?.boxtype == 2) {
        next()
        return
    }
    res.json({
        err: true
    })
})

routeGroupBox.post("/kickMember", async (req, res) => {

    var s: sercurity = req.cookies
    var idBox = req.body.idBox
    var idMem = req.body.idMem

    var exl = await Promise.all([ctHavelistboxchat.GetHaveListidBoxByIdUser(s.id, idBox), ctHavelistboxchat.GetHaveListidBoxByIdUser(idMem, idBox)])

    var hb = exl[0]//nguời đuổi
    var hbMen = exl[1]// người bị đuổi

    if (!hb || !hbMen || hb.admin <= 0) {

        res.json({
            err: true
        })
        return
    }
    if (hb.admin == 1 && (hbMen.admin == 2 || hbMen.admin == 0)) {
        await ctHavelistboxchat.DeleteMenberInGroup(idMem, idBox)
        res.json({
            err: false
        })
        return
    }
    res.json({
        err: true
    })

})
routeGroupBox.post("/upLevel", async (req, res) => {

    var s: sercurity = req.cookies
    var idBox = req.body.idBox
    var idMem = req.body.idMem

    var exl = await Promise.all([ctHavelistboxchat.GetHaveListidBoxByIdUser(s.id, idBox), ctHavelistboxchat.GetHaveListidBoxByIdUser(idMem, idBox)])

    var hb = exl[0]//nguời đuổi
    var hbMen = exl[1]// người bị đuổi

    if (!hb || !hbMen || hb.admin <= 0) {

        res.json({
            err: true
        })
        return
    }
    if (hb.admin == 1 && hbMen.admin == 0) {
        ctHavelistboxchat.UpLevelMenberInGroup(idMem, idBox)
        res.json({
            err: false
        })
        return
    }
    res.json({
        err: true
    })

})
routeGroupBox.post("/addMenber", async (req, res) => {
    console.log(req.body);
    
    var s: sercurity = req.cookies
    var idBox = req.body.idBox
    var idMem = req.body.idMem

    var hb = await ctHavelistboxchat.GetHaveListidBoxByIdUser(s.id, idBox)
    if (!hb || hb.admin <= 0) {
        res.json({
            err: true
        })
        return
    }
    hb = await ctHavelistboxchat.GetHaveListidBoxByIdUser(idMem, idBox)
    console.log(hb);
    
    if (!hb) {
        await ctHavelistboxchat.InsertIdToNewBox(idMem, idBox, idMem)
    }

    res.json({
        err: false
    })
})
routeGroupBox.post("/getAllMenberInChatGroup", async (req, res) => {
    var s: sercurity = req.cookies
    var idBox = req.body.idBox
    var hb = await ctHavelistboxchat.GetHaveListidBoxByIdUser(s.id, idBox)
    if (!hb) {
        res.json({
            err: true
        })
        return
    }
    var ls = await ctHavelistboxchat.GetAllMenberInChatGroup(s.id, idBox)
    res.json({
        err: false,
        ls: ls,
        admin: hb.admin
    })
})
routeGroupBox.post("/recommanFriendList", async (req, res) => {
    var s: sercurity = req.cookies
    var idBox = req.body.idBox
    var exl = await Promise.all([ctHavelistboxchat.GetAllMenberInChatGroup(s.id, idBox),
    ctHaveListFriends.GetHaveListFriendsByIdUser(s.id)])
    // f   h

    // 1 
    // 2   2
    // 3   4
    // 4   6
    // 5   7
    // 6   8
    // 7   
    // 8   
    // 10
    // 11

    var hb = exl[0]
    var friends = exl[1]
    var temp: HaveListBox[] = []
    var j = 0
    for (let i = 0; i < friends.length; i++) {
        const e = friends[i];
        while (e.id > hb[j].idUser && j < hb.length) {
            j += 1;
        }
        if (hb[j].idUser != e.id) {
            var t = new HaveListBox()
            t.setAll(e)
            t.idUser = e.id
            temp.push(t)
        } else {
            var t = new HaveListBox()
            t.setAll(hb[j])
            t.idBox = 2
            temp.push(t)
        }

    }
    res.json({
        ls: temp,
        err: false
    })
})
export default routeGroupBox