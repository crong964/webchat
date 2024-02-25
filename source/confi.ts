import { createHash } from "crypto";

import fs from "fs"
import { dirname, join } from "path";
import { Request, Response } from "express";
import https from "https";
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config'


export default __dirname;
export interface sign {
  account: string;
  password: string;
}
export interface LngLat {
  lng: number;
  lat: number;
  hash?: any;
}
export const confi = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 18654
};

export interface result {
  result: any;
  err: boolean;
}

export function hash(params: string, length?: number) {
  var salt = "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"
  return createHash("shake256", { outputLength: length ? length : 190 })
    .update(params + salt, "utf-8")
    .digest("base64url");
}

export function validateEmail(email: string) {
  return (
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).test(email);
}

export function validatedate(day: string, month: string, year: string) {
  try {
    var dd = parseInt(day);
    var mm = parseInt(month);
    var yy = parseInt(year);
  } catch (error) {
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

export interface postRegister {
  day: string;
  month: string;
  year: string;
  account: string;
  password: string;
  nameUser: string;
  sex: string;
}

export function UnknownString(p: string) {
  if (p == undefined || p.length == 0) {
    return true;
  }
  return false;
}

export function UnknownObject(p: any) {
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
export interface sercurity {
  id: string;
  ab: string;
  sercurity: string;
  time: number;
}
export interface content {
  idBox: string;
  content: string;
}
export function formatDate(d: string) {
  var date = new Date(d);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
export function formatNowDateYMDHMS(d: string) {
  var date = new Date(d);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

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

function equalDate(params: Date) {
  var now = new Date();
  if (now.getDate() !== params.getDate()) {
    return false;
  }
  return true;
}

export function validate(req: Request) {
  var sercurity: sercurity = req.cookies;
  var date = new Date(Number.parseInt(sercurity.time + ""));


  if (!equalDate(date)) {
    return false;
  }
  var tempAb = hash(
    sercurity.sercurity + sercurity.time,
    25
  );
  if (tempAb === sercurity.ab) {
    return true;
  }
  return false;
}
export function renderHtml(res: Response, path: string, data: any) {




  res.json(data)
  //res.render(path, data)
}

export interface limit {
  start: number
  cout: number
}


export function GetImageFromTomTom(lng: string, lat: string) {
  var key = "NcCz24AQhyNMZ4h7LAudoLDGBatHcRnb"
  var URL = `https://api.tomtom.com/map/1/staticimage?key=${key}&center=${lng},${lat}&zoom=15`
  var uuid = uuidv4()
  var path = join(process.cwd(), "dist/public/map/", `${uuid}.png`)
  return new Promise((rs, rej) => {
    https.get(URL, (res) => {
      var r = fs.createWriteStream(path)
      res.pipe(r)
      rs(uuid)
    }).on('error', (e) => {
      rej(e)
    });
  })

}