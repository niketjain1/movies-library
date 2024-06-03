"use client";

import React, { useEffect, useState } from "react";
import { RiMovie2Line } from "react-icons/ri";
import CustomButton from "../button/CustomButton";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") as string;
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    setUserName(null);
    router.push("/signin");
  };

  return (
    <div className="flex flex-row w-full p-3 items-center justify-center bg-gray-800 absolute">
      <RiMovie2Line size={24} className="text-white" />
      <p className="mx-3 text-white">Movies library</p>
      <Link href={"/"} className="ml-auto">
        <CustomButton title={"Home"} />
      </Link>
      {userName ? (
        <>
          <FaRegUserCircle className="ml-4 text-white" size={20} />
          <p className="ml-2 text-white">{userName.split('"')}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="focus:outline-none ml-4 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Logout
          </button>
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
