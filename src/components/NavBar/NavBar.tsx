import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import CustomButton from "../button/CustomButton";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex flex-row w-full p-4 items-center justify-center bg-gray-400 absolute">
      <RiMovie2Line size={24} />
      <p className="mx-3">Movie library</p>
      <Link href={"/"} className="ml-auto">
        <CustomButton title={"Home"} />
      </Link>
      <Link href={"/signin"} className="ml-2">
        <CustomButton title={"Sign In"} customClassName="ml-auto" />
      </Link>
    </div>
  );
};

export default NavBar;
