import express, { Request, Response } from "express";
import { Buffer } from "buffer";
import __dirname, { renderHtml } from "../confi.js";
import {
  hash,
  postRegister,
  sercurity,
  UnknownObject,
  validatedate,
  validateEmail,
} from "../confi.js";
interface google {
  email: string
  name: string
  picture: string
}
import Account from "../source/model/Account.js";
import Validateuser from "../source/model/Validateuser.js";

import ControllerUser from "../source/controller/CtUsers.js";
import CTvalidateuser from "../source/controller/Ctvalidateuser.js";
import CTBox from "../source/controller/CTBox.js";
import CTAccout from "../source/controller/CtAccout.js";
import CTtemporaryuser from "../source/controller/CTtemporaryuser.js";
import GamiAPI from "../gmail.js";
import temporaryuser from "../source/model/temporaryuser.js";
import User from "../source/model/User.js";
import { join } from "path";
var ctAccout = new CTAccout();
var ctUser = new ControllerUser();
var ctvalidateuser = new CTvalidateuser();
var cttemporaryuser = new CTtemporaryuser();
var ctBox = new CTBox();
var gamiAPI = new GamiAPI();

const route: express.Router = express.Router();

setInterval(async () => {
  await cttemporaryuser.fillter();
}, 60000);
route.use((req, res, next) => {
  if (UnknownObject(req.body)) {
    res.json({ err: true, mess: "bạn điền chưa đủ" });
    return;
  }
  next();
});
route.get("/sign", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/font/sign.html");
});
route.post("/sign", async (req: Request, res: Response) => {
  var account = new Account();
  account["setAll"](req.body);
  var err: boolean = false;

  await Promise.all([
    ctAccout.GetAccout(account),
    ctUser.GetUser(account.getAccount()),
  ]).catch((v) => {
    err = true;
  });
  if (err) {
    res.send("lỗi");
    return;
  }

  if (ctUser.user != undefined && ctAccout.account == undefined) {
    res.json({ err: true, mess: "Sai Mật Khẩu" });
    return;
  }
  if (ctUser.user == undefined) {
    res.json({ err: true, mess: "Sai Tài Khoản" });
    return;
  }
  var data = new Date();
  var validateuser = new Validateuser();
  validateuser.id = ctUser.user.id;

  validateuser.cookie = hash(
    ctUser.user.account + validateuser.id + data.toUTCString(),
    25
  );
  validateuser.time = data.getTime();
  validateuser.ab = hash(validateuser.cookie + validateuser.time, 25);

  await ctvalidateuser.InsertValidateuser(validateuser).catch((v) => {
    err = true;
  });
  if (err) {
    res.json("lỗi ");
    return;
  }

  res.cookie("time", validateuser.time, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.cookie("id", ctUser.user.id, {
    maxAge: 1000 * 60 * 60 * 24 * 356,
  });
  res.cookie("ab", validateuser.ab, {
    httpOnly: true,
  });
  res.cookie("sercurity", validateuser.cookie, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 356,
  });
  res.redirect("/")
});
route.get("/register", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/font/register.html");
});
route.post("/register", async (req: Request, res: Response) => {
  var body: postRegister = req.body;
  if (!validateEmail(body.account)) {
    res.json("sai email")
    return
  }
  await gamiAPI.loadAll();
  if (!validatedate(body.day, body.month, body.year)) {
    res.json({ err: true, mess: "sai ngày tháng" });
    return;
  }
  let tem = new temporaryuser();
  console.log(gamiAPI.getAccessToken());

  tem.setAll(body);
  tem.valiCode = hash(JSON.stringify(tem.json()) + gamiAPI.getAccessToken());

  var kq = await ctUser.GetUser(body.account);
  if (kq != undefined) {
    res.status(400);
    res.json({ mess: "tài khoản đã đăng ký" });
    return;
  }

  if (cttemporaryuser.getTemporaryuser(body.account) != undefined) {
    res.status(400);
    res.json({ mess: "hãy kiểm tra mail để kích hoạt" });
    return;
  }
  var url = `http://localhost:666/account/ValidateAcc/${body.account}/${tem.valiCode}`;
  await gamiAPI.contentGmail(body.account, url).catch((v) => {
    console.log(v);
    return;
  });

  cttemporaryuser.InsertNew(tem);
  res.status(200).json({ mess: "bạn đã đăng ký thành công hay kích hoạt đi" });
});
route.get("/logOut", async (req: Request, res: Response) => {
  var sercurity: sercurity = req.cookies;
  console.log(req.cookies);

  await ctvalidateuser
    .DeleteValidate(sercurity.id, sercurity.sercurity)
    .catch((v) => { });
  res.clearCookie("id");
  res.clearCookie("sercurity");
  res.redirect("/account/sign");
});
route.get("/logOutAll", async (req: Request, res: Response) => {
  var sercurity: sercurity = req.cookies;
  console.log(req.cookies);
  var validatedate: Validateuser | undefined =
    await ctvalidateuser.GetValidateUser(sercurity.id, sercurity.sercurity);
  if (!validatedate) {
    res.json("ok");
    return;
  }
  await ctvalidateuser.DeleteValidateAll(sercurity.id).catch((v) => { });
  res.clearCookie("id");
  res.clearCookie("sercurity");
  res.clearCookie("ab");
  res.redirect("/account/sign");
});
route.get("/ValidateAcc/:acc/:vali", async (req: Request, res: Response) => {
  console.log(req.params);
  var s = cttemporaryuser.getTemporaryuser(req.params.acc);

  if (s == undefined) {
    res.status(404).json({ mess: "tài khoản này chưa đăng ký" });
    return;
  }
  var account = new Account();
  account.setAll(s);
  var err = false;
  await ctAccout.InsertAccount(account).catch((v) => {
    console.log(v);
    err = true;
  });
  await ctUser.InsertNewUser(s).catch((v) => {
    console.log(v);
    err = true;
  });
  if (err) {
    console.log(" có lỗi trong việc thêm tài khoản mới ");

    res.end();
    return;
  }

  res.sendFile(__dirname + "/font/sign.html");
});
route.get("/createCodeToChangeAccout", async (req, res) => {
  var account: string | undefined | any = req.query.account;
  if (!account) {
    res.end();
    return;
  }
  if (!validateEmail(account)) {
    res.status(302).json({ mess: "đây không phải email" });
    return;
  }

  if (cttemporaryuser.getTemporaryuser(account) != undefined) {
    res
      .status(302)
      .json({ mess: "hãy kiểm tra gmail để thực hiện chức năng đổi mật khẩu" });
    return;
  }

  var s = await ctUser.GetUser(account);
  if (s == undefined) {
    res.status(404).json({ mess: "tài khoản này không tồn tại" });
    return;
  }
  var check = await gamiAPI.loadAll();
  if (!check) {
    res.status(404).json({ mess: "lỗi gì đó xảy ra" });
    return;
  }
  var tempuser = new temporaryuser();

  var validateCode = hash(account + tempuser.CreatedTime.getTime(), 20);
  var url = `http://localhost:666/account/ForgetAccout/${account}/${validateCode}`;
  check = await gamiAPI.contentGmail(account, url);
  if (!check) {
    res.status(500).json({ mess: "lỗi hệ thống" });
    return;
  }
  tempuser.account = account;
  tempuser.valiCode = validateCode;

  cttemporaryuser.InsertNew(tempuser);
  res.json({ mess: "hãy kiểm tra gmail của bạn" });
});
route.get("/ForgetAccout/:account/:validateCode", async (req, res) => {
  var account = req.params.account;
  if (cttemporaryuser.getTemporaryuser(account) == undefined) {
    res.sendFile(__dirname + "/font/sign.html");
    return
  }
  res.sendFile(__dirname + "/font/changeForgetingAccount.html")
});
route.post("/ForgetAccout", async (req, res) => {
  var account = req.body.account;
  var valiCode = req.body.validateCode;
  var password1 = req.body.password;
  var tempuser = cttemporaryuser.getTemporaryuser(account);
  if (tempuser == undefined) {
    res.status(404).json({ mess: "mã kích hoạt đã hết hạn" });
    return;
  }
  if (tempuser.valiCode !== valiCode) {
    res.status(404).json({ mess: "sai mã kích hoạt" });
    return;
  }
  var s = await ctAccout.UpdatePassword(account, password1)
  res.json({ mess: "đổi thành công" });
});


route.get("/auth", (req, res) => {
  res.end()
})
route.post("/auth", async (req, res) => {
  var g_csrf_token1 = req.body.g_csrf_token
  var g_csrf_token2 = req.cookies.g_csrf_token
  var profi: google = { email: "", name: "", picture: "" }

  if (g_csrf_token1 != g_csrf_token2) {
    res.redirect('/')
    return
  }

  var s = req.body.credential as string
  s.split(".").forEach((v, i) => {
    if (i == 1) {
      profi = JSON.parse(Buffer.from(v, "base64").toString()) as any as google
      console.log(Buffer.from(v, "base64").toString());

    }
  })
  var account = await ctAccout.GetAccoutByName(profi.email)

  if (account == undefined) {
    var d = new Account()
    var p = new User()
    d.setAccount(profi.email)
    d.setPassord(g_csrf_token1)

    p.account = profi.email
    p.nameUser = profi.name
    p.avatar = profi.picture
    var check = await Promise.all([ctAccout.InsertAccount(d), ctUser.InsertNewUser(p)])
    for (let i = 0; i < check.length; i++) {
      if (!check) {
        renderHtml(res, join(__dirname, "/font/sign.ejs)"), {})
        return;

      }
    }
  }

  var user = await ctUser.GetUser(profi.email)
  if (user == undefined) {
    renderHtml(res, join(__dirname, "/font/sign.ejs)"), {})
    return;
  }
  var data = new Date();
  var validateuser = new Validateuser();
  validateuser.id = user.id;

  validateuser.cookie = hash(
    user.account + validateuser.id + data.toUTCString(),
    25
  );
  validateuser.time = data.getTime();
  validateuser.ab = hash(validateuser.cookie + validateuser.time, 25);
  var err
  await ctvalidateuser.InsertValidateuser(validateuser).catch((v) => {
    err = true;
  });
  if (err) {
    res.json("lỗi ");
    return;
  }

  res.cookie("time", validateuser.time, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.cookie("id", user.id, {
    maxAge: 1000 * 60 * 60 * 24 * 356,
  });
  res.cookie("ab", validateuser.ab, {
    httpOnly: true,
  });
  res.cookie("sercurity", validateuser.cookie, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 356,
  });
  res.redirect("/")

})
export default route;
