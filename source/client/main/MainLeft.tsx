import React from "react";

interface NaviAction2 {
  children: React.JSX.Element;
}

export default function MainLeft(p: NaviAction2) {
  return <>{p.children}</>;
}
