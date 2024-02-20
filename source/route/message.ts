import express, { Request, Response } from "express";
import __dirname, { formatDate, renderHtml, sercurity } from "../confi.js";

import CTMessage from "../source/controller/CTMessage.js";

import CTHavelistboxchat from "../source/controller/CTHavelistboxchat.js";
import ControllerUser from "../source/controller/CtUsers.js";
import Box from "../source/model/Box.js";
import { join } from "path";
import { CTHiddenMess } from "../source/controller/CTHiddenMess.js";
import { unlink } from "fs";

var ctMessage = new CTMessage();
var ctHavelistboxchat = new CTHavelistboxchat();
var ctHiddenMess = new CTHiddenMess()
var ctuser = new ControllerUser()
const routeMess = express.Router();

routeMess.post("/getAllContent", async (req: Request, res: Response) => {

  var s: sercurity = req.cookies;
  var idBox = req.body.idBox;

  ctHavelistboxchat.visualBoxChat(s.id, idBox)
  var now = req.body.now
  var idFriend = req.body.idFriend

  var exl = await Promise.all([

    ctHavelistboxchat.GetHaveListidBoxByIdUser(s.id, idBox),
    ctHavelistboxchat.GetIdBoxbyIdUserAndIdFriend(s.id, idFriend),
    ctMessage.GetAllContentByidBox(idBox, s.id, now)])


  var hb = exl[0]
  var li: Box[] = exl[1]
  let listMess = exl[2]

  var box = new Box()
  if (listMess.length > 0) {
    now = listMess[listMess.length - 1].ngay
  } else {
    now = "-1"
  }
  if (li.length > 0) {
    box.setAll(li[0])
    renderHtml(res, join(__dirname, 'font/box/boxchat.ejs'), {
      box: box.json(),
      permission: hb?.admin,
      listMess: listMess,
      id: s.id,
      idFriend: idFriend,
      now: now
    })
    return
  }
  res.end()
});
routeMess.post("/getContentSCroll", async (req: Request, res: Response) => {
  var s: sercurity = req.cookies;
  var idBox = req.body.idBox;
  var now = req.body.now
  var idFriend = req.body.idFriend
  var li: Box[] = await ctHavelistboxchat.GetIdBoxbyIdUserAndIdFriend(s.id, idFriend);
  let listMess = await ctMessage.GetAllContentByidBox(idBox, s.id, now);
  var box = new Box()

  if (listMess.length > 0) {
    now = listMess[listMess.length - 1].ngay
  }
  else {
    now = "-1"
  }
  if (li.length > 0) {
    box.setAll(li[0])
    setTimeout(() => {
      renderHtml(res, join(__dirname, 'font/mess/listMess.ejs'), {
        box: box.json(),
        listMess: listMess,
        id: s.id,
        idFriend: idFriend,
        now: now
      })
    }, 1
    )
    return
  }
  res.end()
});
routeMess.post("/remove", async (req: Request, res: Response) => {
  var idmess = req.body.idMess
  var s: sercurity = req.cookies;
  var f = await ctMessage.GetMessById(idmess)
  var iduser = s.id
  if (f == undefined) {
    res.json({
      err: true,
    })
    return
  }
  if (iduser == (f.idUser + "")) {
    await Promise.all([ctHiddenMess.DelHiddenMess(idmess), ctMessage.DelMessById(idmess, iduser)])
    if (f.type == "1") {
      f.content.split(" ").forEach((v) => {
        console.log(join(__dirname, 'public/upload', v));
        if (v == "") {
          return
        }
        unlink(join(__dirname, 'public/upload', v), (err) => {
          if (err) {
            console.log(err);
          }
        })
      })
    }

    res.json({
      err: false,
    })
    return
  }
  ctHiddenMess.InsertHiddenmess(idmess, iduser)
  res.json({
    err: false,
  })
});
routeMess.post("/hiddenMess", async (req, res) => {
  var idMess = req.body.idMess
  var user: sercurity = req.cookies
  if (idMess == undefined) {
    res.json({})
    return
  }

  var data = await ctHiddenMess.GetHiddenMessByidMessidUser(idMess, user.id)
  if (data) {
    res.json({ err: true })
    return
  }
  ctHiddenMess.InsertHiddenmess(idMess, user.id)
  res.json({ err: false })
})
routeMess.post("/imageMess", async (req: Request, res: Response) => {
  var s = req.cookies as sercurity
  var idBox = req.body.idbox
  var start = req.body.start | 0

  var list = await ctMessage.GetImageMessByidBox(idBox, s.id, { start: start, cout: 4 })
});
export default routeMess;
