"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Page() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="flex justify-center items-center">
        <h1>Loading ...</h1>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <Image
          src="/twitter-cover.jpg"
          height={20}
          width={4000}
          alt="cover pic"
        ></Image>
        <h1>Name : {session.user?.name}</h1>
        <h1>email : {session.user?.email}</h1>
      </div>
    );
  }
}
