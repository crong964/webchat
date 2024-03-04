import React, { useCallback, useEffect, useState } from "react";
import Navi, { NaviAction } from "./share/Navi";
import MainBetween from "./between/MainBetween";
import MainLeft from "./main/MainLeft";
import useNaviState from "./share/useNaviState";
import ChatBox from "./component/box/ChatBox";
import Map from "./main/Map";
import List from "./between/List";
import { Socket } from "socket.io-client";
import { postData } from "./Use/useFetch";
import Responsive from "./share/Responsive";
interface lnglat {
  lng: string;
  lat: string;
}
interface ReceiveMess {
  idBox: string;
  mess: string;
}
interface User {
  name: string;
  ntb: number;
  avatar: string;
}
function useApp() {
  const [user, SetUser] = useState<User>({ avatar: "", name: "", ntb: 0 });
  useEffect(() => {
    postData("/author", {}, (v: any) => {
      var data: User = {
        avatar: v.us.avatar,
        name: v.us.name,
        ntb: v.c,
      };
      SetUser(data);
    });
  }, []);

  function Set(params: any) {
    SetUser({ avatar: user.avatar, name: user.name, ntb: 0 });
  }
  return { user, Set };
}
export default function App() {
  var { user, Set } = useApp();
  var [naviStatus, setnaviStatus] = useState<NaviAction>({ action: "boxlist" });
  var [boxId, setBoxId] = useState<string[]>(["-1", "-1"]);
  const [receiveBoxId, SetReceiveBoxId] = useState<ReceiveMess>({
    idBox: "",
    mess: "",
  });
  const [client, SetClient] = useState<Socket | null>(null);
  const [shareLocation, SetShareLocation] = useState(false);
  const [lnglat, SetLngLat] = useState<lnglat>({ lat: "N", lng: "N" });
  const [isMobile, SetIsMobile] = useState(false);
  const [curNavi, SetCurNavi] = useState<"2" | "3">("2");
  const ShowMap = (lat: string, lng: string) => {
    setnaviStatus({ action: "Map" });
    SetLngLat({ lat: lat, lng: lng });
  };
  const HandleBoxId = (boxId: string[]) => {
    setBoxId(boxId);
    if (window.innerWidth <= 1000) {
      SetIsMobile(true);
      SetCurNavi("3");
    } else {
      SetIsMobile(false);
    }
  };

  const NaviStatus = useCallback((a: any) => {
    setnaviStatus({ action: a });
    if (window.innerWidth <= 1000) {
      SetIsMobile(true);

      if (a == "Map") {
        SetCurNavi("3");
      } else {
        SetCurNavi("2");
      }
    } else {
      SetIsMobile(false);
    }
  }, []);

  useEffect(() => {
    var dataLocation: any;

    dataLocation = setInterval(() => {
      if (shareLocation && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          postData(
            "/map/shareLoction",
            { lng: position.coords.longitude, lat: position.coords.latitude },
            () => {}
          );
        });
      }
    }, 4000);

    return () => {
      clearInterval(dataLocation);
    };
  }, [shareLocation]);
  useEffect(() => {
    const f = async () => {
      const { io } = await import("socket.io-client");
      var client: Socket = io();

      client.on("connect", () => {});
      client.on("liveLocation", (data) => {
        SetShareLocation(true);
      });

      client.onAny((e, t) => {
        if (e == "receiveMess" && t.idBox + "" != boxId[0]) {
          //va.boxdata.handle([va.boxdata.idBox, va.boxdata.idUser]);

          SetReceiveBoxId({ idBox: t.idBox + "", mess: t.content });
        }
      });
      client.on("stopShareLoction", (data) => {
        SetShareLocation(false);
      });
      SetClient(client);
    };
    f();
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  return (
    <>
      <div className=" min-[900px]:flex h-full mainbody ">
        <Navi
          statusShare={shareLocation}
          handel={NaviStatus}
          naviAction={naviStatus.action}
          name={user.name}
          ntb={user.ntb}
          avatar={user.avatar}
          SetUser={Set}
        />
        <Responsive isMobile={isMobile} passingValue={curNavi} showingValue="2">
          {naviStatus.action == "Map" ? (
            <div className="hidden"></div>
          ) : (
            <MainBetween>
              <List
                action={naviStatus.action}
                idBox={receiveBoxId.idBox}
                mess={receiveBoxId.mess}
                curIdbox={boxId[0]}
                handleBoxId={HandleBoxId}
              />
            </MainBetween>
          )}
        </Responsive>
        <Responsive isMobile={isMobile} passingValue={curNavi} showingValue="3">
          <MainLeft>
            {naviStatus.action == "Map" ? (
              <Map
                statusShare={shareLocation}
                clientSocket={client}
                lat={lnglat.lat}
                lng={lnglat.lng}
              />
            ) : (
              <ChatBox
                idbox={boxId[0]}
                key={"f"}
                iduser={boxId[1]}
                clientSocket={client}
                showMap={ShowMap}
              ></ChatBox>
            )}
          </MainLeft>
        </Responsive>
        
      </div>
    </>
  );
}
