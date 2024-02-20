import React, { useEffect, useState } from "react";
import List from "./List";
import Search from "./search";
import { NaviAction } from "../share/Navi";
import AddBoxGroup from "../component/box/AddBoxGroup";
import AddUser from "../component/user/AddUser";

interface NaviAction2 {
  children: React.JSX.Element;
}

export default function MainBetween(p: NaviAction2) {
  var [actionName, setActionName] = useState<"SearchUser" | "ChatGroup" | "">(
    ""
  );

  function HandleActionName(params: "SearchUser" | "ChatGroup" | "") {
    setActionName(params);
  }

  var d = <></>;
  switch (actionName) {
    case "SearchUser":
      d = <AddUser display={HandleActionName}></AddUser>;
      break;
    case "ChatGroup":
      d = <AddBoxGroup display={HandleActionName} />;
      break;
  }

  return (
    <div className="w-full list min-[900px]:w-80  border-r-2 h-full overflow-x-hidden overflow-y-scroll">
      <Search handle={HandleActionName}></Search>
      {d}
      {p.children}
    </div>
  );
}
