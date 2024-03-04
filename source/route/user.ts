import express, { Request, Response } from "express";
import { renderHtml, sercurity } from "../confi";

import CtUser from "../source/controller/CtUsers"
import User from "../source/model/User";


var ctuser = new CtUser()
const user = express.Router()

user.post("/", async (req, res) => {
    var s: sercurity = req.cookies
    var u = await ctuser.GetUserById(s.id)


    renderHtml(res, "", u, "json")
})
user.post("/update", async (req, res) => {
    var s: sercurity = req.cookies
    var birthday = req.body.birthday
    var sex = req.body.sex
    var nameUser = req.body.nameUser
    var p = new User()
    p.birthday = birthday
    p.id = parseInt(s.id + "")
    p.sex = sex
    p.nameUser = nameUser


    var u = await ctuser.UpdateUser(p)


    res.json({
        err: !u
    })
})

export default user