import { Router } from "express";
import multer from "multer"
import path, { join } from "path";
import __dirname, { formatNowDateYMDHMS, sercurity } from "../confi.js";
import CTMessage from "../source/controller/CTMessage.js";
import CTBox from "../source/controller/CTBox.js";
import CTHavelistboxchat from "../source/controller/CTHavelistboxchat.js";
import io from "../server.js";
import Firebase from "../utility/firebase.js";
import { unlink } from "fs/promises";



var ctbox = new CTBox
var ctmess = new CTMessage()
var cthavelistboxchat = new CTHavelistboxchat
const upload = Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(__dirname, '/public/upload'))
    },
    filename: function (req, file, cb) {
        var f = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.fieldname}-${uniqueSuffix}.${f}`)
    }
})
const mutil = multer({
    storage: storage,
    limits: {
        fileSize: 10000000000
    },
    fileFilter(req, file, callback) {
        callback(null, true)
    },
}).array("image", 9)
upload.post('/', mutil, async (req, res) => {

    var files: Express.Multer.File[] = req.files as Express.Multer.File[]


    var idBox = req.body.idBox;
    var s: sercurity = req.cookies;

    var ls = files.map(async (v) => {
        var name = await Firebase.UploadImage(path.join(process.cwd(), "dist\\public\\upload", v.filename), v.mimetype)
        return name
    })

    var names = await Promise.all(ls)
    var deleteLS = files.map(async (v) => {
        var pathImage = path.join(process.cwd(), "dist\\public\\upload", v.filename)
        try {
            await unlink(pathImage)
        } catch (error) {
            console.log(error);
        }
        return true
    })
    var messfile = names.reduce((a, b) => {
        a += `${b} `
        return a
    }, "")

    let check = await cthavelistboxchat.IsIdUserInBox(s.id, idBox);
    if (!check) {
        io.to(s.id).emit("ReqAddFriends", "sai box");
        return;
    }
    let v = await Promise.all([
        cthavelistboxchat.visualBoxChat(s.id, idBox),
        cthavelistboxchat.SetNotSeenInBox(s.id, idBox),
        ctmess.InsertContentIn(idBox, s.id, messfile, "1"),
        ctbox.UpdateLastMessBox(s.id, messfile, idBox, "image"),
        deleteLS
    ]);
    if (!v[0] && !v[2]) {
        io.to(s.id).emit("ReqAddFriends", "sai box");
        return;
    }
    var list = await cthavelistboxchat.GetIdUserOnlineInBox(
        s.id,
        idBox
    );
    var ngays = (new Date()).toDateString()
    var ngay = formatNowDateYMDHMS(ngays)
    list.forEach((v) => {
        io.in(v.idUser + "").emit("receiveMess", { idFriend: s.id, idBox: idBox, content: messfile, type: "1", ngay: ngay });
    });

    res.send({
        idBox: idBox, content: messfile, type: "1", ngay: ngay

    })
})


export default upload
