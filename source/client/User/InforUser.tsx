import React, { useEffect, useState } from "react";
import { postData } from "../Use/useFetch";

interface infor {
  nameUser: string;
  avatar: string;
  birthday: string;
  sex: number;
}
interface updateInfor {
  year: number;
  day: number;
  month: number;
  nameUser: string;
  sex: number;
}
interface update extends infor {
  onClick(): void;
}
interface action extends infor {
  show: boolean;
  SetShow(show: boolean): void;
}
export default function InforUser(data: action) {
  var [infor, SetInfor] = useState<infor>({
    birthday: "",
    avatar: "",
    nameUser: "",
    sex: 0,
  });
  var [u, Setu] = useState(0);
  useEffect(() => {
    postData("/user/", {}, (data: any) => {
      SetInfor(data);
    });
  }, []);
  return (
    <div className="">
      {data.show ? (
        <>
          <div
            className="absolute top-0 bg-black opacity-20 left-0 z-[1000] w-full h-full "
            onClick={() => {
              data.SetShow(!data.show);
            }}
          ></div>
          <div className=" w-full h-56 flex justify-center absolute top-10 left-0 z-[1100]">
            {u == 0 ? (
              <>
                {" "}
                <div className=" bg-white h-[400px] w-[350px]  rounded-md shadow-cellphone">
                  <div className="p-2 font-mono font-bold">
                    Thông tin tài khoản
                  </div>
                  <img
                    src={infor.avatar}
                    className="w-full object-cover h-[150px]"
                    alt=""
                    srcSet=""
                  />
                  <div className="p-3 flex items-center border-b-2 border-r-slate-400">
                    <img
                      src={infor.avatar}
                      alt=""
                      className="size-[55px] rounded-full"
                      srcSet=""
                    />
                    <div className="font-bold font-sans text-[28px] m-2">
                      {infor.nameUser}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="px-2 from-neutral-500">Ngày sinh nhật:</div>
                    <div>{infor.birthday}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="px-2 from-neutral-500">Giới tính: </div>
                    <div>{infor.sex == 0 ? "Nữ" : "Nam"}</div>
                  </div>
                  <div
                    className="p-2 text-center hover:bg-stone-300"
                    onClick={() => {
                      Setu(1);
                    }}
                  >
                    Cập nhật
                  </div>
                </div>
              </>
            ) : (
              <UpdateInfor
                avatar=""
                birthday={infor.birthday}
                nameUser={infor.nameUser}
                sex={infor.sex}
                onClick={() => {
                  Setu(0);
                  postData("/user/", {}, (data: any) => {
                    SetInfor(data);
                  });
                }}
              />
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
function UpdateInfor(data: update) {
  var separateBir = data.birthday.split("-");
  const [infor, SetInfor] = useState<updateInfor>({
    year: parseInt(separateBir[2]),
    day: parseInt(separateBir[0]),
    month: parseInt(separateBir[1]),
    nameUser: data.nameUser,
    sex: data.sex,
  });
  var day: React.JSX.Element[] = [];
  for (let i = 1; i < 31; i++) {
    day.push(
      <option
        onClick={() => {
          SetInfor({ ...infor, day: i });
          console.log(infor);
        }}
      >
        {i}
      </option>
    );
  }
  var month: React.JSX.Element[] = [];
  for (let i = 1; i <= 12; i++) {
    month.push(
      <option
        onClick={() => {
          SetInfor({ ...infor, month: i });
          console.log(infor);
        }}
      >
        {i}
      </option>
    );
  }
  var years = new Date().getFullYear();
  var year: React.JSX.Element[] = [];
  for (let i = years - 60; i < years; i++) {
    year.push(
      <option
        onClick={() => {
          SetInfor({
            ...infor,
            year: i,
          });
        }}
        value={i}
      >
        {i}
      </option>
    );
  }
  return (
    <div className="bg-white h-[400px] w-[350px]  rounded-md shadow-cellphone p-2 flex flex-col justify-between">
      <div>
        <div className="p-2 font-mono font-bold">Cập nhật thông tin</div>
        <div className="p-2">
          <div>Tên người dùng</div>
          <input
            type="text"
            value={infor.nameUser}
            onChange={(e) => {
              SetInfor({ ...infor, nameUser: e.currentTarget.value });
            }}
            className="w-full h-12 p-2 "
          />
        </div>
        <div>
          <div>Ngày sinh</div>
          <div className="flex justify-around">
            <select
              defaultValue={infor.day}
              onChange={(e) => {
                SetInfor({ ...infor, day: parseInt(e.currentTarget.value) });
              }}
              className="border-2 px-3 py-2"
            >
              {day}
            </select>
            <select
              defaultValue={infor.month}
              onChange={(e) => {
                SetInfor({ ...infor, month: parseInt(e.currentTarget.value) });
              }}
              className="border-2 px-3 py-2"
            >
              {month}
            </select>
            <select
              defaultValue={infor.year}
              onChange={(e) => {
                SetInfor({ ...infor, year: parseInt(e.currentTarget.value) });
              }}
              className="border-2 px-3 py-2"
            >
              {year}
            </select>
          </div>
        </div>
        <div>
          <div>Giới tính</div>
          <div className="flex">
            <div
              onClick={() => {
                SetInfor({ ...infor, sex: 0 });
              }}
              className={`px-3 mr-3 cursor-pointer font-sans font-bold py-2 rounded-md ${
                infor.sex == 0
                  ? "bg-blue-500 shadow-lg shadow-blue-500/50 text-white"
                  : ""
              }`}
            >
              Nữ
            </div>
            <div
              onClick={() => {
                SetInfor({ ...infor, sex: 1 });
              }}
              className={`px-3 py-2 cursor-pointer font-sans font-bold  rounded-md ${
                infor.sex == 1
                  ? "bg-blue-500 shadow-lg shadow-blue-500/50 text-white"
                  : ""
              }`}
            >
              Nam
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center space-x-4">
        <div
          className="cursor-pointer rounded-lg font-sans font-bold px-3 py-2 shadow-lg hover:shadow-gray-500/30"
          onClick={data.onClick}
        >
          Thoát
        </div>
        <div
          className="cursor-pointer text-white rounded-lg font-sans font-bold px-3 py-2 bg-blue-500 shadow-lg hover:shadow-blue-500/50"
          onClick={() => {
            if (!confirm("bạn muốn thay đổi không")) {
              return;
            }
            postData(
              "/user/update",
              {
                birthday: `${infor.year}-${infor.month}-${infor.day}`,
                sex: infor.sex,
                nameUser: infor.nameUser,
              },
              (check: any) => {
                alert(check.err);
              }
            );
          }}
        >
          Cập nhật
        </div>
      </div>
    </div>
  );
}
