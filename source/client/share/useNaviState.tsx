import { useState } from "react";
import { NaviAction } from "./Navi";

export default function useNaviState() {
  const [a, b] = useState<string>("boxlist");

  function set(params: string) {
    b(params);
  }
  return { a, set };
}
