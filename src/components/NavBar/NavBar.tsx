"use client";

import React, { useEffect, useState } from "react";
import { RiMovie2Line } from "react-icons/ri";
import CustomButton from "../button/CustomButton";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") as string;
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  return (
    <div className="flex flex-row w-full p-4 items-center justify-center bg-gray-400 absolute">
      <RiMovie2Line size={24} />
      <p className="mx-3">Movie library</p>
      <Link href={"/"} className="ml-auto">
        <CustomButton title={"Home"} />
      </Link>
      {userName ? (
        <>
          <FaRegUserCircle className="ml-4 text-white" size={20} />
          <p className="ml-2 text-white">{userName.split('"')}</p>
        </>
      ) : (
        <Link href={"/signin"} className="ml-2">
          <CustomButton title={"Sign In"} customClassName="ml-auto" />
        </Link>
      )}
    </div>
  );
};

export default NavBar;
