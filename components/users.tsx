"use client"

import FollowButton from "./followButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios"
interface UserDetials {
  username: string;
  name: string;
  currentUserEmail?: string;
  displayUserId?: string;
}

export default function ManyUsers(props: UserDetials) {
  const [following, setFollwing] = useState<string>("");
  let clientEmail = props.currentUserEmail ?? "";
  let userId = props.displayUserId ?? "";
  useEffect(() => {
    const checkForFollowing = async () => {
      let resp = await axios.post("/api/user/checkFollowing", {
        clientEmail,
        userId
      });
      if(resp.data.status === 200){
          setFollwing(resp.data.message);
      }else{
        
        setFollwing("error ocuured")
      }
    };
    checkForFollowing();
  }, []);


  if(following){
    return (
      <div className="p-3 border-b border-gray-700 w-full">
        <div className="flex gap-x-2">
          <Image
            alt="profile pic"
            src="/profilepic.jpg"
            height={50}
            width={50}
            className="rounded-full"
          />
          <h1>{props.name}</h1>
          <h1 className="text-neutral-700">@{props.username}</h1>
        </div>
        <div className=" flex items-center w-full justify-between  mt-2 gap-x-4">
          {/* <FollowButton clientEmail={clientEmail} userId={userId}></FollowButton> */}
          <button className="bg-white hover:bg-gray-300 text-black p-2 rounded-xl w-1/2">
            View Profile
          </button>
        </div>
      </div>
    );
  }
  else {
    return null;
  }

}
