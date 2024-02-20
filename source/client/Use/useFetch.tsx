import { useEffect, useState } from "react";

export function postData(url: string, params: {}, cb: Function) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(params),
  })
    .then((v) => {
      return v.json();
    })
    .then((v) => {
      cb(v);
    });
}
export function getData(url: string, cb: Function) {
  fetch(url)
    .then((v) => {
      return v.json();
    })
    .then((v) => {
      cb(v);
    });
}
export default function useFetch(url: string, params: {}) {
  const [data, setData] = useState();
  useEffect(() => {
    postData(url, params, (v: any) => {
      setData(v);
    });
  }, []);
  return data;
}
export async function postFormData2(url: string, params: any, cb: Function) {
  var s = await fetch(url, {
    method: "POST",
    body: params,
  });
  var js = await s.json();
  cb(js);
}
