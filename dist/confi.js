"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetImageFromTomTom = exports.renderHtml = exports.validate = exports.formatNowDateYMDHMS = exports.formatDate = exports.UnknownObject = exports.UnknownString = exports.validatedate = exports.validateEmail = exports.hash = exports.confi = void 0;
const crypto_1 = require("crypto");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const https_1 = __importDefault(require("https"));
const uuid_1 = require("uuid");
require("dotenv/config");
exports.default = __dirname;
exports.confi = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 18654
};
function hash(params, length) {
    var salt = "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";
    return (0, crypto_1.createHash)("shake256", { outputLength: length ? length : 190 })
        .update(params + salt, "utf-8")
        .digest("base64url");
}
exports.hash = hash;
function validateEmail(email) {
    return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}
exports.validateEmail = validateEmail;
function validatedate(day, month, year) {
    try {
        var dd = parseInt(day);
        var mm = parseInt(month);
        var yy = parseInt(year);
    }
    catch (error) {
        return false;
    }
    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mm == 1 || mm > 2) {
        if (dd > ListofDays[mm - 1]) {
            return false;
        }
    }
    if (mm == 2) {
        var lyear = false;
        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
            lyear = true;
        }
        if (lyear == false && dd >= 29) {
            return false;
        }
        if (lyear == true && dd > 29) {
            return false;
        }
    }
    return true;
}
exports.validatedate = validatedate;
function UnknownString(p) {
    if (p == undefined || p.length == 0) {
        return true;
    }
    return false;
}
exports.UnknownString = UnknownString;
function UnknownObject(p) {
    for (const key in p) {
        if (Object.prototype.hasOwnProperty.call(p, key)) {
            const element = p[key];
            if (UnknownString(element)) {
                return true;
            }
        }
    }
    return false;
}
exports.UnknownObject = UnknownObject;
function formatDate(d) {
    var date = new Date(d);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
exports.formatDate = formatDate;
function formatNowDateYMDHMS(d) {
    var date = new Date(d);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
exports.formatNowDateYMDHMS = formatNowDateYMDHMS;
// (async function name() {
//   http
//     .request(
//       {
//         method: "GET",
//         path: "/s",
//         host: "localhost:666",
//         hostname: "localhost",
//         port: 666,
//         headers: {
//           cookies: "dasdas",
//           connection: "keep-ave",
//         },
//       },
//       (res) => {
//         console.log(res.headers["set-cookie"]);
//         res.on("data", (c) => {
//           console.log(c.toString("utf8"));
//         });
//       }
//     )
//     .end();
// });
function equalDate(params) {
    var now = new Date();
    if (now.getDate() !== params.getDate()) {
        return false;
    }
    return true;
}
function validate(req) {
    var sercurity = req.cookies;
    var date = new Date(Number.parseInt(sercurity.time + ""));
    if (!equalDate(date)) {
        return false;
    }
    var tempAb = hash(sercurity.sercurity + sercurity.time, 25);
    if (tempAb === sercurity.ab) {
        return true;
    }
    return false;
}
exports.validate = validate;
function renderHtml(res, path, data, type) {
    switch (type) {
        case "html":
            res.render(path, data);
            break;
        default:
            res.json(data);
            break;
    }
}
exports.renderHtml = renderHtml;
function GetImageFromTomTom(lng, lat) {
    var key = "NcCz24AQhyNMZ4h7LAudoLDGBatHcRnb";
    var URL = `https://api.tomtom.com/map/1/staticimage?key=${key}&center=${lng},${lat}&zoom=15`;
    var uuid = (0, uuid_1.v4)();
    var path = (0, path_1.join)(process.cwd(), "dist/public/map/", `${uuid}.png`);
    return new Promise((rs, rej) => {
        https_1.default.get(URL, (res) => {
            var r = fs_1.default.createWriteStream(path);
            res.pipe(r);
            rs(uuid);
        }).on('error', (e) => {
            rej(e);
        });
    });
}
exports.GetImageFromTomTom = GetImageFromTomTom;
