import React, { useEffect, useState } from "react";
import SingleMess, { singleMess } from "../mess/SingleMess";
import { postData, postFormData2 } from "../../Use/useFetch";

import { Socket } from "socket.io-client";
import tt from "@tomtom-international/web-sdk-maps";
import { Friend } from "../user/FiendList";

interface ClientSocket {
  clientSocket: Socket | null;
}
interface Menber {
  avatar: string;
  nameUser: string;
  idUser: string;
  admin: number;
  permission: number;
  idBox: string;
}
interface RecommanUser {
  admin: number;
  avatar: string;
  nameUser: string;
  idUser: string;
  idBox: string;
}
interface BoxInfor extends ClientSocket {
  idbox: string;
  iduser: string;
  showMap(lat: string, lng: string): void | undefined;
}
interface boxChat {
  avatar: string;
  nameUser: string;
  idbox: string;
  iduser: string;
  type: string;
  permission: number;
}
interface SendMessData extends ClientSocket {
  idbox: string;
}
interface Location {
  idbox: string;
}
interface IdBox extends Location {
  permission: number;
}
interface lnglat {
  lng: string;
  lat: string;
}
function f() {}
function sendMess() {}
var per = ["Thành viên", "Quản trị viên", "Phó quản trị"];
function useChatBox(boxInfor: BoxInfor) {
  const [listMess, setListMess] = useState<singleMess[]>([]);
  const [boxChatData, setBoxChatData] = useState<boxChat>({
    avatar: "",
    idbox: "",
    iduser: "",
    nameUser: "",
    type: "0",
    permission: 0,
  });
  const [scroll, SetScroll] = useState(0);
  const [scrollStatus, SetScrollStatus] = useState<"up" | "down">("up");
  const [load, setLoad] = useState(false);
  const [now, setNow] = useState("");

  useEffect(() => {
    var url = "mess/getAllContent";
    if (boxInfor.idbox == "-2") {
      url = "/box/chat";
    }
    postData(
      url,
      { idFriend: boxInfor.iduser, idBox: boxInfor.idbox },
      (v: any) => {
        setBoxChatData({
          avatar: v.box.avatar,
          idbox: v.box.idBox,
          iduser: v.id,
          nameUser: v.box.nameUser,
          type: v.id == v.idFriend ? "1" : "0",
          permission: v.permission,
        });

        setListMess((v.listMess as []).reverse());
        setNow(v.now);
      }
    );
  }, [boxInfor.idbox, boxInfor.iduser]);

  useEffect(() => {
    boxInfor.clientSocket?.on("receiveMess", (data) => {
      //{ idFriend: cookie.id, idBox: data.idBox, content: data.content, type: "0", ngay: ngay }
      if (data.idBox != boxChatData.idbox) {
        return;
      }
      var temp: singleMess | any = {
        avatar: boxChatData.avatar,
        content: data.content,
        idCurrent: boxChatData.iduser,
        type: data.type,
        idMess: data.idMess,
        idUser: data.idFriend,
        idUser2: boxChatData.iduser,
        ngay: data.ngay,
      };
      setListMess([...listMess, temp]);
      SetScrollStatus("down");
    });

    return () => {
      boxInfor.clientSocket?.off("receiveMess");
    };
  }, [listMess]);
  function SetParamester() {
    postData(
      "mess/getContentSCroll",
      { idFriend: boxInfor.iduser, idBox: boxChatData.idbox, now: now },
      (v: any) => {
        setListMess([...(v.listMess as []).reverse(), ...listMess]);
        setNow(v.now);
        setLoad(false);
        SetScrollStatus("up");
      }
    );
    setLoad(true);
  }

  function Set(type: "AddMyMessIntoListMess", value: any) {
    switch (type) {
      case "AddMyMessIntoListMess":
        var temp: singleMess | any = {
          avatar: "",
          content: value,
          idCurrent: boxChatData.iduser,
          type: "0",
          idMess: "",
          idUser: boxChatData.iduser,
          idUser2: boxChatData.iduser,
          ngay: "",
        };

        setListMess([...listMess, temp]);
        SetScrollStatus("down");

        break;
    }
  }
  return {
    listMess,
    boxChatData,
    now,
    load,
    scroll,
    scrollStatus,

    SetParamester,
    SetScroll,
    SetScrollStatus,
    setListMess,

    Set,
  };
}

function SendMess(data: SendMessData) {
  const [text, SetText] = useState("");
  return (
    <div className="chat">
      <div className="feature p-4 flex">
        <div className="w-8">
          <label htmlFor="file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-black hover:fill-blue-400 w-8 h-8"
              viewBox="0 0 16 16"
            >
              <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12z" />
            </svg>
            <form action="" className="hidden fileform">
              <input type="hidden" value={data.idbox} name="idBox" />
              <input
                type="file"
                id="file"
                name="image"
                onChange={(files) => {
                  f();
                  var form = new FormData(
                    document.querySelector(".fileform") as HTMLFormElement
                  );

                  if (files.currentTarget.files?.length) {
                    var form = new FormData(
                      document.querySelector(".fileform") as HTMLFormElement
                    );
                    postFormData2(
                      "http://localhost:666/upload/",
                      form,
                      (d: any) => {
                        alert("xong");
                      }
                    );
                  }
                }}
                multiple
              />
            </form>
          </label>
        </div>
        <Location idbox={data.idbox} />
      </div>
      <div className="flex p-2 ">
        <input
          type="text"
          placeholder="Aa"
          className="focus:border-dotted mess w-11/12 bg-stone-200 rounded-lg p-2 mr-3 border-0 "
          value={text}
          onChange={(inputData) => {
            SetText(inputData.currentTarget.value);
          }}
        />
        <button
          className="hover:bg-stone-300 rounded-full p-3"
          onClick={() => {
            sendMess();

            if (text.length <= 0) {
              return;
            }
            let data2 = {
              idBox: data.idbox,
              content: text,
              type: "0",
            };

            data.clientSocket?.emit("sendMess", data2);
            SetText("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-black hover:fill-blue-600"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
function MenberData(data: Menber) {
  return (
    <div
      title={`Member${data.idUser}`}
      className={`px-2 h-18 my-2 flex hover:bg-stone-200 cursor-pointer py-2 Member${data.idUser}`}
    >
      <div className="flex justify-center ">
        <div className="overflow-hidden w-14 h-14 rounded-full mr-2">
          <img className="w-full" src={data.avatar} alt="" />
        </div>
      </div>
      <div className="w-4/5">
        <div className=" font-sans flex items-center">
          <div className="">{data.nameUser}</div>
          <div className="text-[10px] pl-2">({per[data.admin]})</div>
        </div>
        <div className="">
          {data.admin != 1 ? (
            <div>
              <button
                className="px-3 py-1 rounded-xl bg-blue-400"
                onClick={() => {
                  postData(
                    "groupbox/kickMember",
                    { idBox: data.idBox, idMem: data.idUser },
                    (v: any) => {
                      if (!v.err) {
                        (
                          document.querySelector(
                            `.Member${data.idUser}`
                          ) as HTMLElement
                        ).classList.add("hidden");
                      }
                    }
                  );
                }}
              >
                Kích
              </button>
              <button
                className="ml-2 px-3 py-1 rounded-xl bg-blue-400"
                onClick={() => {
                  postData(
                    "groupbox/upLevel",
                    { idBox: data.idBox, idMem: data.idUser },
                    (v: any) => {
                      if (!v.err) {
                        alert("tc");
                      }
                    }
                  );
                }}
              >
                Thăng cấp
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
function RecommanUserData(data: RecommanUser) {
  return (
    <div
      title={`Member${data.idUser}`}
      className={`px-2 h-18 my-2 flex hover:bg-stone-200 cursor-pointer py-2 `}
    >
      <div className="flex justify-center ">
        <div className="overflow-hidden w-14 h-14 rounded-full mr-2">
          <img className="w-full" src={data.avatar} alt="" />
        </div>
      </div>
      <div className="w-4/5">
        <div className=" font-sans flex items-center justify-items-center">
          <div className="">{data.nameUser}</div>
          <div className={`text-[10px] pl-2 Member${data.idUser}`}>
            {data.admin != -2 ? "( đã tham gia )" : ""}
          </div>
        </div>
        <div className="b">
          {data.admin == -2 ? (
            <button
              className="px-3 py-1 rounded-xl bg-blue-400"
              onClick={() => {
                postData(
                  "groupbox/addMenber",
                  { idBox: data.idBox, idMem: data.idUser },
                  (v: any) => {
                    if (!v.err) {
                      (
                        document.querySelector(
                          `.Member${data.idUser}`
                        ) as HTMLElement
                      ).innerHTML = "( đã tham gia )";
                      (
                        document.querySelector(`.b`) as HTMLElement
                      ).classList.add("hidden");
                    }
                  }
                );
              }}
            >
              Mời tham gia
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
function GroupAction(data: IdBox) {
  const [show, SetShow] = useState(false);

  const [ls, SetLs] = useState<Menber[]>([]);
  const [showList, SetShowList] = useState(false);

  const [recommanList, SetRecommanList] = useState<RecommanUser[]>([]);

  var list: any;
  if (showList) {
    list = ls.map((v) => {
      return (
        <MenberData
          idBox={data.idbox}
          avatar={v.avatar}
          key={v.idUser}
          nameUser={v.nameUser}
          idUser={v.idUser}
          admin={v.admin}
          permission={data.permission}
        />
      );
    });
  } else {
    list = recommanList.map((v) => {
      return (
        <RecommanUserData
          idBox={data.idbox}
          avatar={v.avatar}
          key={v.idUser}
          nameUser={v.nameUser}
          idUser={v.idUser}
          admin={v.admin}
        />
      );
    });
  }
  return (
    <div className="flex">
      {data.permission != 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 mr-2 fill-black hover:fill-blue-500"
          onClick={() => {
            postData(
              "/groupbox/recommanFriendList",
              {
                idBox: data.idbox,
              },
              (v: any) => {
                SetRecommanList(v.ls);
                SetShow(true);
                SetShowList(false);
              }
            );
          }}
        >
          <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
        </svg>
      ) : (
        <></>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 mr-2 fill-white hover:fill-blue-500"
        onClick={() => {
          SetShowList(true);
          postData(
            "/groupbox/getAllMenberInChatGroup",
            { idBox: data.idbox },
            (v: any) => {
              SetLs(v.ls);
              SetShow(true);
              SetShowList(true);
            }
          );
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>

      {show ? (
        <div className=" h-full w-full bg-white py-10 flex justify-center z-50 fixed top-0 left-0 ">
          <div className="w-[400px] border-black border-2 p-2 rounded-2xl">
            <div className="border-black border-b-2 flex pb-4 justify-between content-center">
              <div className="text-lg font-bold font-mono cursor-text">
                {showList ? "Danh sách thành viên" : "Danh sách bạn bè"}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  SetShow(false);
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
            <div className="overflow-y-auto overflow-x-hidden">{list}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function HeadChatBox(data: boxChat) {
  return (
    <div className="pl-2 h-16 py-2 flex bg-stone-100 cursor-pointer items-center justify-between">
      <div className="flex items-center">
        <div className="overflow-hidden w-14 h-14 rounded-full mr-3">
          <img className="" src={data.avatar} alt="" srcSet="" />
        </div>
        <div className="w-max px-3 font-sans">
          <div className="">{data.nameUser}</div>
        </div>
      </div>
      <div className="pr-5">
        {data.type == "0" ? (
          ""
        ) : (
          <GroupAction idbox={data.idbox} permission={data.permission} />
        )}
      </div>
    </div>
  );
}

function useLocation() {
  const [show, SetShow] = useState(false);
  const [type, SetType] = useState("");
  const [time, SetTime] = useState("");

  function Set(type: "show" | "type" | "time", value: any) {
    switch (type) {
      case "show":
        SetShow(value as boolean);
        break;
      case "type":
        SetType(value);
        break;
      case "time":
        SetTime(value);
        break;
    }
  }
  return { show, type, time, Set };
}
function Location(data: Location) {
  var va = useLocation();
  useEffect(() => {
    if (va.show == true) {
      if (navigator.geolocation) {
        var control2 = new tt.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
            timeout: 2000,
          },
          showUserLocation: true,
          trackUserLocation: true,
        });

        var map2 = tt.map({
          container: "map",
          key: "NcCz24AQhyNMZ4h7LAudoLDGBatHcRnb",
          center: [-122.4194, 37.7749],
          zoom: 12,
        });
        map2.addControl(control2);
      }
    }
  }, [va.show]);
  return (
    <div className="w-8 relative cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8 fill-black hover:fill-blue-700"
        onClick={() => {
          va.Set("show", !va.show);
        }}
      >
        <path
          fillRule="evenodd"
          d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          clipRule="evenodd"
        />
      </svg>

      {va.show ? (
        <div className="absolute bottom-full left-1/4 p-2 bg-white w-max rounded-xl border-2 font-mono border-black">
          <div
            id="map"
            className="w-[200px] h-[200px] absolute bottom-full"
          ></div>
          <div className=" font-bold text-center relative">Loại chia sẻ</div>
          <label
            id="shareLocation"
            className="flex justify-center p-2 mr-1"
            onClick={() => {
              va.Set("type", "shareLocation");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-black h-6 w-6"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"
              />
              <path
                fillRule="evenodd"
                d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
              />
            </svg>
            <div className="pr-2">chia sẻ vị trí</div>
            <input
              type="radio"
              id="shareLocation"
              name="type"
              value="shareLocation"
            />
          </label>
          <label
            id="liveLocation"
            className="flex justify-center p-2"
            onClick={() => {
              va.Set("type", "liveLocation");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-black h-6 w-6 mr-1"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
            </svg>
            <div className="pr-2">theo dõi vị trí</div>
            <input
              type="radio"
              id="liveLocation"
              name="type"
              value="liveLocation"
            />
          </label>
          {va.type == "liveLocation" ? (
            <div>
              <div className="py-2 font-bold text-center">
                Thời gian cho theo dõi
              </div>
              <label id="liveLocation" className="flex justify-center">
                <div className="pr-2">15 phút</div>
                <input
                  type="radio"
                  id="liveLocation"
                  name="time"
                  value="15phut"
                />
              </label>
              <label id="liveLocation" className="flex justify-center">
                <div className="pr-2">1 giờ</div>
                <input type="radio" id="liveLocation" name="time" value="1h" />
              </label>
              <label id="liveLocation" className="flex justify-center">
                <div className="pr-2">3 giờ</div>
                <input type="radio" id="liveLocation" name="time" value="3h" />
              </label>
            </div>
          ) : (
            <></>
          )}

          <button
            className="px-1 py-0.5 rounded-lg bg-blue-500 text-white font-bold font-mono"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((ps) => {
                  alert("hello");
                  postData(
                    "map/subscribe",
                    {
                      idbox: data.idbox,
                      type: va.type,
                      lng: ps.coords.longitude,
                      lat: ps.coords.latitude,
                    },
                    (d: any) => {
                      console.log(d);

                      va.Set("show", false);
                    }
                  );
                });
              }
            }}
          >
            Chia sẻ
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default function ChatBox(boxInfor: BoxInfor) {
  //mess/getAllContent

  const {
    SetParamester,
    SetScroll,
    SetScrollStatus,
    setListMess,
    Set,
    listMess,
    boxChatData,
    load,
    now,
    scroll,
    scrollStatus,
  } = useChatBox(boxInfor);

  useEffect(() => {
    var f = document.querySelector(".boxscroll") as HTMLElement;

    if (f) {
      var y1 = scroll;

      var y2 = f.scrollHeight;

      if (scrollStatus == "up") {
        f.scrollTo({
          behavior: "auto",
          top: y2 - y1,
        });
      } else {
        f.scrollTo({
          behavior: "auto",
          top: y2,
        });
      }
      SetScroll(f.scrollHeight);
    }
  }, [listMess]);

  var idCurrent = "";
  var id = "";
  if (boxChatData.iduser.length > 0) {
    id = boxChatData.iduser;
  }
  var list = listMess.map((v) => {
    var s = (
      <SingleMess
        avatar={boxChatData.avatar}
        content={v.content}
        idCurrent={idCurrent}
        ngay={v.ngay}
        type={v.type}
        idMess={v.idMess}
        idUser={v.idUser}
        idUser2={id}
        showMap={boxInfor.showMap}
        key={v.idMess}
      />
    );
    idCurrent = v.idUser;
    return s;
  });
  return boxInfor.idbox != "-1" ? (
    <div className=" boxchat w-full min-[1000px]:w-10/12 ">
      {boxChatData ? (
        <>
          <HeadChatBox
            avatar={boxChatData.avatar}
            nameUser={boxChatData.nameUser}
            idbox={boxChatData.idbox}
            iduser=""
            type={boxChatData.type}
            permission={boxChatData.permission}
          />
          <div className=" bg-white  h-[400px] min-[900px]:h-2/3 border-y-2 grid grid-cols-1 content-end py-2">
            <div
              className=" overflow-x-hidden overflow-y-scroll boxscroll"
              onScroll={(r) => {
                if (load) {
                  return;
                }

                if (r.currentTarget.scrollTop == 0) {
                  if (now == "-1") {
                    return;
                  }
                  SetParamester();
                }
              }}
            >
              {list}
            </div>
          </div>
          <SendMess
            idbox={boxChatData.idbox}
            clientSocket={boxInfor.clientSocket}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}
