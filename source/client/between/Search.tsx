import React from "react";

function search() {}
function searchuserHTML() {}
function addGroup() {}

interface search {
  handle: Function;
}
export default function Search(state: search) {
  return (
    <div className="flex justify-center py-3 px-2 pb-8 z-10 sticky top-0 left-0  bg-white items-center">
      <div className="w-9/12 bg-stone-200 rounded-md">
        <div className="flex h-8 relative ">
          <div className="grid grid-cols-1 h-full content-center absolute top-0 left-0 px-1 ">
            <img src="../public/image/search.svg" className="h-4" alt="" />
          </div>
          <input
            className="w-full bg-stone-200 pl-8 rounded-md"
            placeholder="tìm kiếm"
            onKeyUp={() => search()}
            type="text"
          />
        </div>
      </div>
      <div className="w-2/12 " onClick={() => state.handle("SearchUser")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className=" w-8/12 h-auto fill-black hover:fill-blue-500"
          viewBox="0 0 16 16"
        >
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
          <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z" />
        </svg>
      </div>
      <div className="w-2/12" onClick={() => state.handle("ChatGroup")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8/12 h-auto  hover:fill-blue-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      </div>
    </div>
  );
}
