"use client";

import axios from "axios";
import toast from "react-hot-toast";

interface Ids {
  clientEmail: string;
  userId: string;
}

export default function FollowButton(props: Ids) {
  return (
    <button
      onClick={async () => {
        let response = await axios.post("/api/user/followUser");
        if (response.data.status === 200) {
          toast.success("success");
        }
      }}
      className="bg-white hover:bg-gray-300 text-black p-2 rounded-full w-1/2"
    >
      FOLLOW
    </button>
  );
}
