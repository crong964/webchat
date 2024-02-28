import React, { useState } from "react";
import { Remove } from "../box/AddBoxGroup";
import { postData } from "../../Use/useFetch";

function removeSearchUserHTML() {}
interface user {
  nameUser: string;
  avatar: string;
  id: string;
  display: Function;
}
function SearchUserName() {}
function User(d: user) {
  return (
    <>
      <div className="px-2 h-18 py-2 flex hover:bg-stone-200 cursor-pointer content-center">
        <div className="w-14 h-14 overflow-hidden">
          <img
            className="rounded-full w-full h-auto"
            src={d.avatar}
            alt=""
            srcSet=""
          />
        </div>
        <div className="ml-4">
          <div className="w-full px-3 font-sans">
            <div className="">{d.nameUser}</div>
          </div>
          <button
            onClick={() => {
              postData(
                "friends/addFriendsRequset",
                { idFriend: d.id },
                (data: any) => {
                  if (!data.err) {
                    alert(data.mess);
                    d.display("");
                  }
                }
              );
            }}
            className="px-2 py-1 rounded-lg bg-blue-400"
          >
            Kết bạn
          </button>
        </div>
      </div>
    </>
  );
}
export default function AddUser(params: Remove) {
  const [name, SetName] = useState("");
  const [listUS, SetList] = useState<user[]>([]);
  var list = listUS.map((v) => {
    return (
      <User
        avatar={v.avatar}
        id={v.id}
        nameUser={v.nameUser}
        key={v.id}
        display={params.display}
      />
    );
  });
  return (
    <div className=" h-full w-full  py-10 flex justify-center z-50 fixed top-0 left-0">
      <div className="w-11/12 sm:w-1/3 bg-white rounded-lg p-3  border-2">
        <div className="border-black border-b-2 flex pb-4 justify-between content-center">
          <div className="text-lg cursor-text">Thêm bạn</div>
          <div
            className="cursor-pointer"
            onClick={() => {
              params.display("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 fill-black hover:fill-blue-500"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
            </svg>
          </div>
        </div>
        <input
          type="email"
          placeholder="nhập email "
          value={name}
          id="UserName"
          className="border-black border-b-2 p-4 my-3 w-9/12 focus:outline-none focus:shadow-outline"
          onChange={(e) => {
            SetName(e.currentTarget.value);
          }}
        />
        <div className="border-2 h-96 kq overflow-y-scroll">{list}</div>
        <div
          className="my-3 flex justify-end"
          onClick={() => () => {
            SearchUserName();
          }}
        >
          <div
            className="px-4 py-2 cursor-pointer bg-blue-500 font-bold text-white"
            onClick={() => {
              if (name.length < 3) {
                alert("bạn chưa nhập");
                return;
              }
              postData(
                "/friends/searchuser",
                { nameUser: name },
                (data: any) => {
                  SetList(data.listUser);
                }
              );
            }}
          >
            Tìm kiếm
          </div>
        </div>
      </div>
    </div>
  );
}
