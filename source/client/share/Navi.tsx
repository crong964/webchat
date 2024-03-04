import React, { useState } from "react";
import useNaviState from "./useNaviState";
import InforUser from "../User/InforUser";
import SubNavi from "./SubNavi";

interface User {
  ntb: number;
}
interface navi {
  name: string;
  avatar: string;
  ntb: number;
  naviAction: "boxlist" | "friend" | "requestfriendlist" | "Map";
  handel: Function;
  statusShare: boolean;
  SetUser(data: User): void;
}
export interface NaviAction {
  action: "boxlist" | "friend" | "requestfriendlist" | "Map";
}

function requestfriendlist() {}
function boxlist() {}
function friendlist() {}
function mapF() {}
function useInfor() {
  const [show, SetShow] = useState(false);

  return { show, SetShow };
}
export default function Navi(data: navi) {
  var { a, set } = useNaviState();
  var { show, SetShow } = useInfor();
  return (
    <div className="nav w-full lg:w-20 bg-blue-400 flex justify-between lg:justify-start flex-col font-mono">
      <div className=" mt-5 flex justify-around items-center">
        <div className="visible lg:hidden text-white font-bold text-[55px]">
          Chatbox
        </div>
        <div
          className=" overflow-hidden w-[55px] lg:w-9/12 h-14 rounded-full "
          onClick={() => {
            if (!show) {
              SetShow(!show);
            }
          }}
        >
          <img
            className=" w-full "
            title={data.name}
            src={data.avatar}
            alt=""
          />
          <InforUser
            show={show}
            birthday=""
            avatar=""
            nameUser=""
            sex={0}
            SetShow={SetShow}
          />
        </div>
      </div>
      <div className="flex justify-between lg:flex-col ">
        <SubNavi
          className="p-3 min-[900px]:mt-2 hover:bg-blue-700"
          classNameShow="bg-blue-700"
          showValue="boxlist"
          value={a}
          onClick={() => {
            set("boxlist");
            data.handel("boxlist");
          }}
        >
          <div className=" flex justify-center rounded-full px-1 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              className="bi bi-envelope-check fill-white"
              viewBox="0 0 16 16"
            >
              <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
              <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
            </svg>
          </div>
        </SubNavi>

        <SubNavi
          className="p-3 min-[900px]:mt-2 cursor-pointer bg-blue-400 hover:bg-blue-700"
          classNameShow="bg-blue-700"
          onClick={() => {
            data.handel("friend");
            set("friend");
          }}
          showValue="friend"
          value={a}
        >
          <div className=" flex justify-center rounded-full px-1 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              className="bi bi-journal-text fill-white "
              viewBox="0 0 16 16"
            >
              <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
            </svg>
          </div>
        </SubNavi>

        <SubNavi
          className="p-3 min-[900px]:mt-2 cursor-pointer bg-blue-400 hover:bg-blue-700"
          classNameShow="bg-blue-700"
          onClick={() => {
            data.handel("requestfriendlist");
            set("requestfriendlist");
            data.SetUser({ ntb: 0 });
          }}
          showValue="requestfriendlist"
          value={a}
        >
          <div className="flex justify-center rounded-full  px-1 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              className=" fill-white"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
              <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z" />
            </svg>
            {data.ntb > 0 ? (
              <div className="absolute top-2 right-2 rounded-full py-0.5 px-1 text-xs bg-red-600 text-white font-bold">
                {data.ntb}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </SubNavi>

        <SubNavi
          className="p-3 min-[900px]:mt-2 relative bg-blue-400 hover:bg-blue-700 "
          onClick={() => {
            data.handel("Map");
            set("Map");
          }}
          classNameShow="bg-blue-700"
          showValue="Map"
          value={a}
        >
          <div className="flex justify-center rounded-full  px-1 py-2">
            {data.statusShare ? (
              <div className="absolute top-2 right-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-red-500 rounded-full bg-white mr-2 "
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                </svg>
              </div>
            ) : (
              <div></div>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              width="32"
              height="32"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>
          </div>
        </SubNavi>

        <div className="p-3 min-[900px]:mt-2 bg-blue-400 hover:bg-blue-700">
          <a
            href="http://localhost:666/account/logOut"
            className=" flex justify-center rounded-full px-1 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-box-arrow-right fill-white"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
