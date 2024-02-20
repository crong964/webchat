import React from "react";
interface subNavi {
  className: string;
  onClick(): void;
  children: React.JSX.Element;
  value: string;
  showValue: string;
  classNameShow: string;
}

export default function SubNavi(p: subNavi) {
  if (p.showValue == p.value) {
    return (
      <div className={`${p.className} ${p.classNameShow}`} onClick={p.onClick}>
        {p.children}
      </div>
    );
  }
  return (
    <div className={`${p.className} `} onClick={p.onClick}>
      {p.children}
    </div>
  );
}
