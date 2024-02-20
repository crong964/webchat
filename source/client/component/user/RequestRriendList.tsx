import React, { useEffect, useState } from "react";

import { Friend } from "./FiendList";
import { postData } from "../../Use/useFetch";
function acceptAddFriendRequest() {}
function cacelAddFriendRequest() {}

interface RequestFriend {
  avatar: string;
  nameUser: string;
  id: string;
  Remove(id: string): void;
}
function useRequestFriendList() {
  const [requestFriend, SetRequestFriend] = useState<Friend[]>([]);
  useEffect(() => {
    postData("friends/listAddFriendRequest/", {}, (data: any) => {
      SetRequestFriend([...data.listUser]);
    });
  }, []);

  function RemoveRequestFriend(id: string) {
    SetRequestFriend([
      ...requestFriend.filter((v) => {
        return v.id != id;
      }),
    ]);
  }
  return {
    requestFriend,
    RemoveRequestFriend,
  };
}

export default function RequestFriendList() {
  const { requestFriend, RemoveRequestFriend } = useRequestFriendList();

  var ls = requestFriend.map((v, i) => {
    return (
      <RequestFriendData
        avatar={v.avatar}
        id={v.id}
        nameUser={v.nameUser}
        key={i}
        Remove={RemoveRequestFriend}
      />
    );
  });

  return (
    <div>
      <div className="border-t-2 py-5 text-center">Lời mời kết bạn</div>
      {ls}
    </div>
  );
}

function RequestFriendData(data: RequestFriend) {
  return (
    <div className="px-2 h-18 py-2 flex hover:bg-stone-200 cursor-pointer F<%=e.id%>">
      <div className="overflow-hidden w-14 h-14 rounded-full mr-2">
        <img className="w-full" src={data.avatar} alt="" srcSet="" />
      </div>
      <div className="grid grid-cols-1 content-start">
        <div className="w-4/5 px-3 font-sans">
          <div className="">{data.nameUser}</div>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              postData(
                "friends/acceptAddFriendRequest",
                { idFriend: data.id },
                (rq: any) => {
                  alert(rq.mess);
                  data.Remove(data.id);
                }
              );
            }}
            className="px-2 py-1 mr-1 rounded-lg bg-blue-400"
          >
            Chấp nhận
          </button>
          <button
            onClick={() => {
              postData(
                "friends/cacelAddFriendRequest",
                { idFriend: data.id },
                (rq: any) => {
                  alert(rq.mess);
                  data.Remove(data.id);
                }
              );
            }}
            className="px-2 py-1 rounded-lg bg-red-400"
          >
            từ chối
          </button>
        </div>
      </div>
    </div>
  );
}
