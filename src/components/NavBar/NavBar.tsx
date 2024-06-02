import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import CustomButton from "../button/CustomButton";

const NavBar = () => {
  return (
    <div className="flex flex-row p-4 items-center justify-center bg-gray-400">
      <RiMovie2Line size={24} />
      <p className="mx-3">Movie library</p>
      <CustomButton title={"Sign In"} customClassName="ml-auto" />
    </div>
  );
};

export default NavBar;
