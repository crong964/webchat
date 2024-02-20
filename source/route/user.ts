import express, { Request, Response } from "express";
import { sercurity } from "../confi";

import CtUser from "../source/controller/CtUsers"


var ctuser = new CtUser()
const user = express.Router()

user.get("/", async (req, res) => {
    var s: sercurity = req.cookies
    var u = await ctuser.GetUserById(s.id)
    res.end()
})


export default user