"use client";

import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";

export const SignOutButton = (props: { isSession: boolean }) => {
  if (props.isSession) {
    return (
      <div className="flex  hover:bg-blue-500 w-full p-4 h-full flex-col justify-center items-center">
        <button
          className="flex flex-col items-center justify-center"
          onClick={() => signOut()}
        >
          <BiLogOut size={30}></BiLogOut>
          <h1 className="md:block hidden">LOGOUT</h1>
        </button>
      </div>
    );
  } else {
    return (
      <Link
        href="/sign-in"
        className="w-full flex flex-col items-center p-4 hover:bg-blue-500"
      >
        <FiLogIn size={34}></FiLogIn>
        <h1 className="hidden md:block">LOGIN</h1>
      </Link>
    );
  }
};
