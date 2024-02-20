import React from "react";
import { Remove } from "../box/AddBoxGroup";

function removeSearchUserHTML() {}

function SearchUserName() {}
export default function AddUser(params:Remove) {
  return (
    <>
      <div className=" h-full w-full  py-10 flex justify-center z-50 fixed top-0 left-0">
        <div className="w-11/12 sm:w-1/3 bg-white rounded-lg p-3  border-2">
          <div className="border-black border-b-2 flex pb-4 justify-between content-center">
            <div className="text-lg cursor-text">Thêm bạn</div>
            <div
              className="cursor-pointer"
              onClick={() => {
                removeSearchUserHTML();
                params.display("")
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 fill-black hover:fill-blue-500"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
              </svg>
            </div>
          </div>
          <input
            type="text"
            placeholder="nhập tên "
            id="UserName"
            className="border-black border-b-2 p-4 my-3 w-9/12 focus:border-white"
          />
          <div className="border-2 h-96 kq overflow-y-scroll"></div>
          <div
            className="my-3 flex justify-end"
            onClick={() => SearchUserName()}
          >
            <input
              type="submit"
              value="Tìm kiếm "
              className="px-4 py-2 bg-blue-500 font-bold text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}
