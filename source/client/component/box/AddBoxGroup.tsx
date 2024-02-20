import React, { useEffect, useRef, useState } from "react";
import { getData, postData } from "../../Use/useFetch";
function createGroup() {}
function removeSearchUserHTML() {}
function list() {}
export interface Remove {
  display: Function;
}
interface inforFriend {
  avatar: string;
  nameUser: string;
  id: string;
  action(action: "AddSelectedFriend" | "DeleteSelectedFriend", va: any): void;
}
//http://localhost:666/box/addGroup
function useAddBoxGroup() {
  const [listFriend, SetListFriend] = useState<inforFriend[]>([]);
  const [selectedFriendList, SetSelectedFriendList] = useState(
    new Map<string, boolean>()
  );

  useEffect(() => {
    getData("box/addGroup", (v: any) => {
      SetListFriend(v.l);
    });
  }, []);

  function AddSelectedFriend(id: string) {
    if (!selectedFriendList.has(id)) {
      SetSelectedFriendList(new Map(selectedFriendList.set(id, true)));
    }
  }
  function DeleteSelectedFriend(id: string) {
    if (selectedFriendList.has(id)) {
      selectedFriendList.delete(id);
      SetSelectedFriendList(new Map(selectedFriendList));
    }
  }

  function SetState(
    action: "AddSelectedFriend" | "DeleteSelectedFriend",
    va: any
  ) {
    switch (action) {
      case "AddSelectedFriend":
        AddSelectedFriend(va);
        break;
      case "DeleteSelectedFriend":
        DeleteSelectedFriend(va);
        break;
    }
  }
  return {
    listFriend,
    selectedFriendList,
    SetState,
  };
}
function d() {}
export default function AddBoxGroup(params: Remove) {
  const { listFriend, selectedFriendList, SetState } = useAddBoxGroup();

  var recommendedFriendList = listFriend.map((v) => {
    return (
      <RecommendedFriend
        action={() => {
          SetState("AddSelectedFriend", v.id);
        }}
        avatar={v.avatar}
        id={v.id}
        nameUser={v.nameUser}
        key={v.id}
      />
    );
  });
  var SelectedFriendslist = listFriend
    .filter((v) => {
      return selectedFriendList.has(v.id);
    })
    .map((v) => {
      return (
        <SelectedFriend
          action={SetState}
          avatar={v.avatar}
          id={v.id}
          key={v.id}
          nameUser={v.nameUser}
        ></SelectedFriend>
      );
    });
  return (
    <>
      <div className=" h-full w-full bg-white py-10 flex justify-center z-50 fixed top-0 left-0">
        <div className="w-[360px]  border-black border-2 p-2 rounded-3xl">
          <div className="border-black border-b-2 flex pb-4 justify-between content-center">
            <h2 className="font-bold text-xl">Thêm thanh viên</h2>
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

          <div className="relative my-2">
            <div className="absolute top-0 left-0"></div>
            <input
              className="pl-5 py-2 w-full"
              type="text"
              placeholder="tên nhóm chat"
            />
          </div>
          <form className="cactv flex justify-start overflow-x-scroll h-24">
            {SelectedFriendslist}
          </form>

          <div className="my-4">gợi ý</div>
          <div className="overflow-y-scroll h-80">{recommendedFriendList}</div>
          <div className="flex justify-end ">
            {selectedFriendList.size > 2 ? (
              <div
                onClick={() => {
                  var s: any[] = [];
                  selectedFriendList.forEach((v, k) => {
                    console.log(v);
                    console.log(k);
                    s.push(k);
                  });

                  postData(
                    "http://localhost:666/box/addGroup",
                    { ls: s },
                    (data: string) => {
                      alert(data);
                    }
                  );

                  createGroup();
                }}
                className="px-4 py-2 font-mono text-black hover:bg-blue-500 hover:text-white"
              >
                Tạo nhóm
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function RecommendedFriend(params: inforFriend) {
  return (
    <div
      className="flex h-18 items-center mt-2 cursor-pointer rounded-3xl py-2 hover:text-blue-500 border-white border-2 hover:border-black"
      onClick={() => {
        params.action("AddSelectedFriend", params.id);
      }}
    >
      <div className="w-14 h-14 overflow-hidden rounded-full">
        <img className=" w-full h-auto" src={params.avatar} alt="" />
      </div>
      <div className="ml-4">
        <div className="w-full px-3 font-mono">{params.nameUser}</div>
      </div>
    </div>
  );
}

function SelectedFriend(params: inforFriend) {
  return (
    <div
      className="flex flex-col justify-center mr-6 TV${id} cursor-pointer"
      onClick={() => {
        params.action("DeleteSelectedFriend", params.id);
      }}
    >
      <div className="w-14 h-14 overflow-hidden ">
        <img
          className="rounded-full w-full h-auto"
          src={params.avatar}
          alt=""
        />
      </div>
      <div className=" font-mono text-center w-14 h-5 overflow-hidden">
        {params.nameUser}
      </div>
    </div>
  );
}
