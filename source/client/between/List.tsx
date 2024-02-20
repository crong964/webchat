import React, { useEffect } from "react";
import { NaviAction } from "../share/Navi";
import useNaviState from "../share/useNaviState";
import BoxListData from "../component/box/BoxListData";
import useFetch from "../Use/useFetch";
import FiendList from "../component/user/FiendList";
import RequestFriendList from "../component/user/RequestRriendList";

interface data extends NaviAction {
  handleBoxId(data: string[]): void;
  idBox: string;
  mess: string;
  curIdbox: string;
}
export default function BoxList(p: data) {
  var list = <>{p.action}</>;

  switch (p.action) {
    case "boxlist":
      list = (
        <BoxListData
          handle={p.handleBoxId}
          curIdbox={p.curIdbox}
          idBox={p.idBox}
          mess={p.mess}
        />
      );
      break;
    case "friend":
      list = <FiendList showboxchat={p.handleBoxId} />;
      break;
    case "requestfriendlist":
      list = <RequestFriendList />;
      break;
    case "Map":
      break;
  }
  return <div className="boxchatlist ">{list}</div>;
}
