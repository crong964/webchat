import React from "react";

interface Responsive {
  showingValue: string;
  isMobile: boolean;
  passingValue: string;
  children: React.JSX.Element;
}
export default function Responsive(da: Responsive) {
  if (da.isMobile && da.passingValue == da.showingValue) {
    return da.children;
  }
  if (!da.isMobile) {
    return da.children;
  }
  return <></>;
}
