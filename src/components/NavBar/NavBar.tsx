import React from "react";
import { RiMovie2Line } from "react-icons/ri";

const NavBar = () => {
  return (
    <div className="flex flex-row p-4 items-center justify-center bg-gray-400">
      <RiMovie2Line size={24} />
      <p className="mx-3">Movie library</p>
      <button className="ml-auto border border-gray-200 p-2 rounded-lg bg-slate-600">
        Sign in
      </button>
    </div>
  );
};

export default NavBar;
