import express, { Request, Response, NextFunction } from "express";
import http from "http";
import fs from "fs"
import cookieParser from "cookie-parser";
import __dirname, { LngLat, content, formatNowDateYMDHMS, hash, renderHtml, validate } from "./confi.js";


import route from "./route/account.js";
import routeFriends from "./route/friends.js";
import routeBox from "./route/box.js";
import routeMess from "./route/message.js";

import bodyParser from "body-parser";
import { sercurity } from "./confi.js";
import { Server, Socket } from "socket.io";
import { parse } from "cookie";

import Ctvalidateuser from "./source/controller/Ctvalidateuser.js";
import CTHavelistboxchat from "./source/controller/CTHavelistboxchat.js";
import CTMessage from "./source/controller/CTMessage.js";
import { join } from "path";
import CTBox from "./source/controller/CTBox.js";
import ControllerUser from "./source/controller/CtUsers.js";
import CTAddFriendReques from "./source/controller/CTAddFriendReques.js";

import upload from "./route/upload.js";
import routeMap from "./route/map.js";
import routeGroupBox from "./route/groupbox.js";

var ctmessage = new CTMessage();
var cthavelistboxchat = new CTHavelistboxchat();
var ctvalidateuser = new Ctvalidateuser();
var ctbox = new CTBox()
var ctuser = new ControllerUser()
var ctAddFriendReques = new CTAddFriendReques()

var port = 666;
export var ip: string = ""
const app: express.Express = express();
const server = http.createServer(app);
app.use("/public", express.static(join(__dirname, 'public')));
app.use("/static", express.static(join(process.cwd(), 'dist/client')));


const io = new Server(server, {});

app.use(cookieParser());
app.use(bodyParser.json({

}));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
async function Vali(req: Request, res: Response, next: NextFunction) {
  if (validate(req)) {
    next();
    return;
  }
  var sercurity: sercurity = req.cookies;
  var s = await ctvalidateuser.GetValidateUser(
    sercurity.id,
    sercurity.sercurity
  );
  if (!s) {
    res.json({
      err: true
    })
    return;
  }
  var date = new Date();
  sercurity.ab = hash(sercurity.sercurity + date.getTime(), 25);
  res.cookie("time", date.getTime(), {
    httpOnly: true
  });
  res.cookie("ab", sercurity.ab, {
    httpOnly: true
  });

  next();
}
app.use("/account", route);
app.use("/friends", Vali, routeFriends);

app.use("/box", Vali, routeBox);
app.use("/groupbox", Vali, routeGroupBox)

app.use("/mess", Vali, routeMess);
app.use("/map", Vali, routeMap)
app.use("/upload", upload)
app.get("/", async (req, res) => {
  var sercurity: sercurity = req.cookies;
  if (!validate(req)) {
    var s = await ctvalidateuser.GetValidateUser(
      sercurity.id,
      sercurity.sercurity
    );

    if (!s) {
      renderHtml(res, join(__dirname, "/font/sign.ejs"), {},"html")
      return;
    }
    var date = new Date();
    sercurity.ab = hash(sercurity.sercurity + date.getTime(), 25);
    res.cookie("time", date.getTime(), {
      httpOnly: true,
    });
    res.cookie("ab", sercurity.ab, {
      httpOnly: true,
    });
  }
  res.sendFile(join(__dirname, 'client/index.html'))
})
app.post("/author", Vali, async (req, res) => {
  var sercurity: sercurity = req.cookies;
  var exl = await Promise.all([
    ctuser.GetUserById(sercurity.id),
    ctAddFriendReques.GetCountFriendRequestByStatus(sercurity.id, "NotSeen")
  ])
  res.json(
    { err: false, us: exl[0], c: exl[1] }
  )
})
// app.get("/test", (req, res) => {
//   io.in(req.cookies.id + "").emit("receiveMessTest", { idMess: "11", idFriend: req.cookies.id, idBox: '11', content: "data.content", type: "0", ngay: "ngay" });
//   res.json({})
// })

// app.get("/ui", async (req, res) => {
//   var sercurity: sercurity = req.cookies;
//   if (!validate(req)) {
//     var s = await ctvalidateuser.GetValidateUser(
//       sercurity.id,
//       sercurity.sercurity
//     );


//     if (!s) {

//       renderHtml(res, join(__dirname, "/font/sign.ejs"), {})
//       return;
//     }
//     var date = new Date();
//     sercurity.ab = hash(sercurity.sercurity + date.getTime(), 25);
//     res.cookie("time", date.getTime(), {
//       httpOnly: true,
//     });
//     res.cookie("ab", sercurity.ab, {
//       httpOnly: true,
//     });
//   }


//   var l = await Promise.all(
//     [ctbox.getAllBoxByIdUser(sercurity.id), ctuser.GetUserById(sercurity.id), ctAddFriendReques.GetCountFriendRequestByStatus(sercurity.id, "NotSeen")])
//   renderHtml(res, join(__dirname, "/font/index.ejs"), { listBoxchat: ctbox.lsBox, us: l[1], c: l[2] })
// });
// app.get("/test", async (req, res) => {
//   if (validate(req)) {
//     res.sendFile(__dirname + "/font/client.html");
//     return;
//   }
//   var sercurity: sercurity = req.cookies;
//   var s = await ctvalidateuser.GetValidateUser(
//     sercurity.id,
//     sercurity.sercurity
//   );
//   if (!s) {
//     res.sendFile(__dirname + "/font/sign.html");
//     return;
//   }
//   var date = new Date();
//   sercurity.ab = hash(sercurity.sercurity + date.getTime(), 25);
//   res.cookie("time", date.getTime(), {
//     httpOnly: true,
//   });
//   res.cookie("ab", sercurity.ab, {
//     httpOnly: true,
//   });

//   res.sendFile(__dirname + "/font/client.html");
// });
server.listen(port, () => {
  ip = `http://localhost:${port}`
  console.log(`http://localhost:${port}`);
  console.log(`http://localhost:${port}/ui`);
});

io.on("connection", async (socket) => {
  var cookie: sercurity | any = parse(
    socket.handshake.headers.cookie ? socket.handshake.headers.cookie : ""
  );
  var s = await ctvalidateuser.GetValidateUser(cookie.id, cookie.sercurity);
  if (!s) {
    socket.emit("ended");
    return;
  }
  io.in(socket.id).socketsJoin(cookie.id);

  await ctvalidateuser.UpdateStatusInValidateuser(
    cookie.id,
    (
      await io.in(cookie.id).allSockets()
    ).size
  );

  socket.on("disconnecting", async (reason) => {


    var rooms = socket.rooms;
    rooms.forEach((element) => {
      socket.leave(element);
    });
    await ctvalidateuser.UpdateStatusInValidateuser(
      cookie.id,
      (
        await io.in(cookie.id).allSockets()
      ).size
    );
  });

  socket.on("sendMess", async (data: content) => {

    let check = await cthavelistboxchat.IsIdUserInBox(cookie.id, data.idBox);
    if (!check) {
      socket.emit("ReqAddFriends", "sai box");
      return;
    }
    let v = await Promise.all([
      cthavelistboxchat.visualBoxChat(cookie.id, data.idBox),
      cthavelistboxchat.SetNotSeenInBox(cookie.id, data.idBox),
      ctmessage.InsertContentIn(data.idBox, cookie.id, data.content),
      ctbox.UpdateLastMessBox(cookie.id, data.content, data.idBox, "mess")
    ]);
    if (!v[0] && v[2] == undefined) {
      socket.emit("ReqAddFriends", "lỗi");
      return;
    }
    var list = await cthavelistboxchat.GetIdUserOnlineInBox(
      cookie.id,
      data.idBox
    );
    await io
      .in(cookie.id)
      .allSockets()
      .then((v) => {
        v.forEach((idSocket) => {
          if (idSocket != socket.id) {
            socket.to(idSocket).emit("ReqAddFriends", "có thông báo");
          } else {
            socket.emit("ReqAddFriends", "gửi thành công");
          }
        });
      });

    var s = (new Date()).toDateString()
    var ngay = formatNowDateYMDHMS(s)


    list.forEach((id) => {
      io.in(id.idUser + "").emit("receiveMess", { idMess: v[2].insertId, idFriend: cookie.id, idBox: data.idBox, content: data.content, type: "0", ngay: ngay });
    });

  });

});

export default io;





