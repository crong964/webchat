import React, { useEffect, useState } from "react";
import { postData } from "../../Use/useFetch";

function showboxchat() {}
interface FiendListHandle {
  showboxchat(data: string[]): void;
}
export interface Friend extends FiendListHandle {
  avatar: string;
  nameUser: string;
  id: string;
}

function useFiendList() {
  const [friends, SetFriends] = useState<Friend[]>([]);

  useEffect(() => {
    postData("friends/", {}, (data: any) => {
      SetFriends([...data.l]);
    });
  }, []);

  return { friends };
}

export default function FiendList(handel: FiendListHandle) {
  const { friends } = useFiendList();

  var ls = friends.map((v, i) => {
    return (
      <FiendData
        showboxchat={handel.showboxchat}
        avatar={v.avatar}
        id={v.id}
        nameUser={v.nameUser}
        key={i}
      />
    );
  });
  return <>{ls}</>;
}
function FiendData(data: Friend) {
  return (
    <div className="px-2 h-18 my-2 flex hover:bg-stone-200 cursor-pointer py-2">
      <div className="flex justify-center ">
        <div className="overflow-hidden w-14 h-14 rounded-full mr-2">
          <img className="w-full" src={data.avatar} alt="" />
        </div>
      </div>
      <div className="w-4/5">
        <div className=" font-sans">
          <div className="">{data.nameUser}</div>
        </div>
        <div>
          <button
            className="px-3 py-1 rounded-xl bg-blue-400"
            onClick={() => {
              data.showboxchat(["-2", data.id]);
            }}
          >
            Nhắn tin
          </button>
        </div>
      </div>
    </div>
  );
}
