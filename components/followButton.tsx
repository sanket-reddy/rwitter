"use client";

import axios from "axios";
import { Prosto_One } from "next/font/google";
import { useState } from "react";
import toast from "react-hot-toast";

interface Ids {
  clientEmail: string;
  userId: string;
}

export default function FollowButton(props: Ids) {
  const [following, setFollwing] = useState<boolean>(false);
  return (
    <button
      onClick={async () => {
        let response = await axios.post("/api/user/followUser", {
          clientEmail: props.clientEmail,
          userId: props.userId,
        });
        if (response.data.status === 200) {
          toast.success("success");
          setFollwing(true);
        }
      }}
      className="bg-white hover:bg-gray-300 text-black p-2 rounded-full w-1/2"
    >
      {following ? "following" : "follow"}
    </button>
  );
}
