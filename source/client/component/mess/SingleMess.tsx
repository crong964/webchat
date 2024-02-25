import React, { useRef, useState } from "react";
import { postData } from "../../Use/useFetch";
export interface singleMess {
  idUser: string;
  content: string;
  ngay: string;
  type: string;
  idMess: string;
  idUser2: string;
  idCurrent: string;
  avatar: string;
  showMap(lat: string, lng: string): void | undefined;
}
interface LocationType {
  content: string;
  type: string;
  showMap(lat: string, lng: string): void | undefined;
  children: React.JSX.Element;
}
interface Location {
  lat: string;
  lng: string;
}
interface Mess {
  content: string;
  type: string;
}
interface MessId {
  messId: string;
  controll: boolean;
  type: string;
  className: string;
}
interface ControlMessButton {
  onClick(): void;
  children: React.JSX.Element;
  text: string;
}
function shownavigate() {}
function hidennaviagte() {}
function removemess() {}

interface mess {
  content: string;
}
function TypeMessImage(data: mess) {
  var texts = data.content;
  texts = texts.trim();

  var r = texts.split(" ");
  var a = r.map((text) => {
    var s = `http://localhost:666/public/upload/${text}`;
    return (
      <span className="w-fit " key={Math.random()}>
        {" "}
        <img src={s} className="w-30 h-auto" alt="" />
      </span>
    );
  });

  return <div className="columns-3">{a}</div>;
}

function LiveLoction(data: mess) {
  return (
    <div className="bg-blue-700 flex items-center cursor-pointer text-white font-bold font-mono p-3 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 fill-white mr-2"
        viewBox="0 0 16 16"
      >
        <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
      </svg>
      {data.content}
    </div>
  );
}

function Location(data: mess) {
  var image = data.content.split("_");
  return (
    <div
      title={data.content}
      className=" text-white flex flex-col justify-items-start font-bold font-mono p-3 rounded-lg"
    >
      <img className="size-[200px]" src={`/public/map/${image[0]}.png`} alt="" srcSet="" />
      <div className="text-black py-2">
        Vị trí của bạn
      </div>
    </div>
  );
}
function Mess(data: Mess) {
  switch (data.type + "") {
    case "1":
      return <TypeMessImage content={data.content}></TypeMessImage>;
    case "2":
      return <LiveLoction content={data.content} />;
    case "3":
      return <Location content={data.content}></Location>;
    default:
      return <div className="">{data.content}</div>;
  }
}

function ShowMess(data: LocationType) {
  var s = data.content.split("_");
  var lo: Location = {
    lng: s[1],
    lat: s[2],
  };
  switch (data.type + "") {
    case "2":
      return (
        <button
          onClick={() => {
            data.showMap("N", "N");
          }}
        >
          {data.children}
        </button>
      );
    case "3":
      return (
        <button
          onClick={() => {
            data.showMap(lo.lat, lo.lng);
          }}
        >
          {" "}
          {data.children}
        </button>
      );
    default:
      return <> {data.children}</>;
  }
}
function ControlMessButton(data: ControlMessButton) {
  return (
    <button
      className="p-2 hover:bg-stone-200 w-full font-mono flex items-center justify-around"
      onClick={data.onClick}
    >
      {data.children}
      <div>{data.text}</div>
    </button>
  );
}
function ControlMess(data: MessId) {
  switch (data.controll) {
    case false:
      return <></>;
    case true:
      return (
        <div className={data.className}>
          <div className="p-2 min-w-[100px] rounded-lg shadow-[0_1px_2px_0_rgba(60,64,67,.1),_0_2px_6px_2px_rgba(60,64,67,.15)]">
            {data.type == "2" ? (
              <ControlMessButton
                onClick={() => {
                  postData(
                    "/mess/remove",
                    { idMess: data.messId },
                    (da: any) => {
                      if (!da.err) {
                        (
                          document.querySelector(
                            `.Mess${data.messId}`
                          ) as HTMLElement
                        ).innerHTML = "";
                      }
                    }
                  );
                }}
                text="Xóa"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </ControlMessButton>
            ) : (
              <></>
            )}

            <ControlMessButton
              onClick={() => {
                postData(
                  "/mess/hiddenMess",
                  { idMess: data.messId },
                  (da: any) => {
                    if (!da.err) {
                      (
                        document.querySelector(
                          `.Mess${data.messId}`
                        ) as HTMLElement
                      ).innerHTML = "";
                    }
                  }
                );
              }}
              text="Ẩn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
              </svg>
            </ControlMessButton>
          </div>
        </div>
      );
  }
}

export default function SingleMess(data: singleMess) {
  const [naviagte, setNaviagte] = useState(false);
  const [controll, SetControll] = useState(false);

  return (
    <div
      title={data.idMess}
      className={"Mess" + data.idMess}
      onClick={(r) => {
        if (controll) {
          SetControll(false);
        }
      }}
    >
      {data.idUser == data.idUser2 ? (
        <div
          className="w-full"
          key={data.idMess}
          onMouseEnter={() => {
            setNaviagte(true);
          }}
          onMouseLeave={() => {
            setNaviagte(false);
          }}
        >
          <div className="flex justify-end p-2 ">
            <div className="grid grid-cols-1 relative bg-stone-200 p-2 rounded-xl max-w-[80%] lg:max-w-[400px]">
              {naviagte ? (
                <div
                  className=" h-5 w-5 absolute right-full top-1/2"
                  onClick={() => {
                    if (!controll) {
                      SetControll(true);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="fill-black hover:fill-blue-500 cursor-pointer"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  </svg>

                  <ControlMess
                    className="absolute right-full bottom-0 bg-white"
                    messId={data.idMess}
                    type="2"
                    controll={controll}
                  />
                </div>
              ) : (
                <></>
              )}
              <ShowMess
                content={data.content}
                showMap={data.showMap}
                type={data.type}
              >
                <Mess content={data.content} type={data.type} />
              </ShowMess>
              <p className=" text-red-400">{data.ngay}</p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full "
          onMouseEnter={() => {
            setNaviagte(true);
          }}
          onMouseLeave={() => {
            setNaviagte(false);
          }}
        >
          <div className=" my-2 ml-2 ">
            <div className="flex items-center max-w-[80%] lg:max-w-[400px] ">
              <div className="overflow-hidden w-10 h-10  rounded-full mr-3">
                {data.idCurrent != data.idUser ? (
                  <>
                    <img className="" src={data.avatar} alt="" />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="grid grid-cols-1 relative ">
                <div className="bg-blue-200 p-2 rounded-md ">
                  <ShowMess
                    content={data.content}
                    showMap={data.showMap}
                    type={data.type}
                  >
                    <p className="M<%=e.type%> text-right ">
                      <Mess content={data.content} type={data.type} />
                    </p>
                  </ShowMess>
                  <p className="text-right text-red-400 ">{data.ngay}</p>
                </div>
                {naviagte ? (
                  <div
                    className=" ml-3 rounded-full p-1 h-6 w-6 absolute left-full top-1/2 z-0"
                    onClick={() => {
                      if (!controll) {
                        SetControll(true);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      className="fill-black hover:fill-blue-500 cursor-pointer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                    <ControlMess
                      className="absolute left-full top-0"
                      controll={controll}
                      messId={data.idMess}
                      type="1"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
