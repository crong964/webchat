import React, { useEffect, useMemo, useState } from "react";
import useFetch, { postData } from "../../Use/useFetch";

interface handle {
  handle: Function;
  idBox: string;
  mess: string;
  curIdbox: string;
}
interface Button {
  onClick(): void;
  text: string;
  children: React.JSX.Element;
}
interface BoxButton {
  show: boolean;
  idBox: string;
  SetShow(d: boolean): void;
}
interface boxdata {
  handle: Function;
  avatar: string;
  nameUser: string;
  boxtype: string;
  id: string;
  idUser: string;
  content: string;
  idBox: string;
  messType: "mess" | "image" | "liveLocation" | "shareLocation";
  status: number;
  ReadBox(idbox: string): void;
}

interface MessType {
  content: string;
  type: "mess" | "image" | "liveLocation" | "shareLocation";
}
function useBoxList() {
  const [data, SetData] = useState<boxdata[]>([]);

  useEffect(() => {
    postData("box/", {}, (v: any) => {
      SetData(v.listBoxchat);
    });
  }, []);

  function ReadBox(idbox: string) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (idbox == element.idBox) {
        element.status = 1;
        break;
      }
    }
    SetData([...data]);
  }
  function ReceiveMess(idBox: string, mess: string, curIdbox: string) {
    var tempLs: boxdata[] = [];
    var box: boxdata | undefined = undefined,
      curBox: boxdata | undefined = undefined;
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.idBox == idBox && idBox != curIdbox) {
        box = element;
        box.status = 2;
        continue;
      }
      if (element.idBox == curIdbox) {
        curBox = element;
        curBox.status = 1;
        continue;
      }
      tempLs.push(element);
    }
    if (idBox == curIdbox && curBox) {
      SetData([curBox, ...tempLs]);
      return;
    }
    if (box && !curBox) {
      SetData([box, ...tempLs]);
      return;
    }
    if (box && curBox) {
      SetData([curBox, box, ...tempLs]);
      return;
    }
  }
  return {
    data,
    ReceiveMess,
    ReadBox,
  };
}

function boxid(idBox: string, idUser: string) {}
function MessType(data: MessType) {
  switch (data.type) {
    case "mess":
      return <span>{data.content}</span>;
    case "image":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 inline-block"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "liveLocation":
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 inline-block mr-2 fill-black"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a.5.5 0 0 1 .5.5v.518A7 7 0 0 1 14.982 7.5h.518a.5.5 0 0 1 0 1h-.518A7 7 0 0 1 8.5 14.982v.518a.5.5 0 0 1-1 0v-.518A7 7 0 0 1 1.018 8.5H.5a.5.5 0 0 1 0-1h.518A7 7 0 0 1 7.5 1.018V.5A.5.5 0 0 1 8 0m-.5 2.02A6 6 0 0 0 2.02 7.5h1.005A5 5 0 0 1 7.5 3.025zm1 1.005A5 5 0 0 1 12.975 7.5h1.005A6 6 0 0 0 8.5 2.02zM12.975 8.5A5 5 0 0 1 8.5 12.975v1.005a6 6 0 0 0 5.48-5.48zM7.5 12.975A5 5 0 0 1 3.025 8.5H2.02a6 6 0 0 0 5.48 5.48zM10 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
          </svg>
        </>
      );
    case "shareLocation":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-black h-8 w-8"
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
      );
  }
}
function Button(d: Button) {
  return (
    <div
      className="w-full flex hover:bg-stone-200 font-mono p-2 justify-around cursor-pointer"
      onClick={d.onClick}
    >
      {d.children}
      <div>{d.text}</div>
    </div>
  );
}
function BoxButton(params: BoxButton) {
  switch (params.show) {
    case true:
      return (
        <div className="flex flex-col absolute top-1/3 min-w-[70%] right-0">
          <div className=" bg-white border-2 z-10 p-3 rounded-lg flex flex-col">
            <Button onClick={() => {}} text="Ẩn thông báo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </Button>
            <Button
              text="Xóa hộp thoại"
              onClick={() => {
                postData(
                  "/box/hiddenBoxChat",
                  {
                    idBox: params.idBox,
                  },
                  (n: any) => {
                    alert(n.mess);
                    params.SetShow(false);
                    (
                      document.querySelector(
                        `.BOX${params.idBox}`
                      ) as HTMLElement
                    ).classList.add("hidden");
                  }
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </Button>
          </div>
        </div>
      );
    default:
      return <></>;
  }
}

function useBoxData() {
  const [show, SetShow] = useState(false);

  return { show, SetShow };
}

function BoxData(data: boxdata) {
  const va = useBoxData();

  var status = ["", "", "font-bold"];
  // Seen = "1",
  // Unread = "2"
  return (
    <div className={`relative BOX${data.idBox}`} title={`BOX${data.idBox}`}>
      <div
        onClick={() => {
          data.handle([data.idBox, data.idUser]);
          data.ReadBox(data.idBox);
        }}
        className="px-2 h-18 py-2 flex items-center hover:bg-stone-200 cursor-pointer"
      >
        <input type="hidden" id="avatar" value="<%=element.avatar %>" />
        <input type="hidden" id="name" value="<%=element.nameUser %>" />
        <div className="overflow-hidden w-14 h-14 rounded-full mr-3">
          <img src={data.avatar} alt="" />
        </div>
        <div className="w-3/5 px-3 font-sans">
          <div className="">
            {data.boxtype == "2" ? "nhóm chat" : data.nameUser}
          </div>
          <div
            className={`text-xs overflow-hidden h-8 flex ${
              status[data.status]
            }`}
          >
            {data.id == data.idUser ? "Bạn " : ""}
            <MessType content={data.content} type={data.messType} />
          </div>
        </div>
        {data.status == 2 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 hover:fill-blue-500"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <></>
        )}
      </div>
      <div
        className="absolute right-2 top-0 p-2 rounded-full hover:bg-stone-200"
        onClick={() => {
          va.SetShow(!va.show);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="fill-black cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </div>
      <BoxButton idBox={data.idBox} show={va.show} SetShow={va.SetShow} />
    </div>
  );
}
export default function BoxListData(p: handle) {
  const { data, ReceiveMess, ReadBox } = useBoxList();
  useEffect(() => {
    ReceiveMess(p.idBox, p.mess, p.curIdbox);
  }, [p.idBox, p.mess]);

  var list = data.map((v) => {
    return (
      <BoxData
        ReadBox={ReadBox}
        status={v.status}
        handle={p.handle}
        avatar={v.avatar}
        boxtype={v.boxtype}
        content={v.content}
        id={v.id}
        idUser={v.idUser}
        nameUser={v.nameUser}
        key={v.idBox}
        idBox={v.idBox}
        messType={v.messType}
      />
    );
  });

  return <>{list}</>;
}
