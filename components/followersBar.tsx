"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DisplayAccounts from "./displayAccounts";
import { User } from "@prisma/client";
import DisplayFollower from "./displayFollowers";



export default function FollowersBar() {
  const { data: session } = useSession();
  const [NewAccounts,setNewAccounts] = useState<User[]>();
  const [Followers,setFollowers] = useState<User[]>();
  const [following, setFollwing] = useState<boolean>(false);
  useEffect(() => {
    const fetchFollowing = async () => {
      const resp = await axios.post("/api/user/getUsersBar", {
        email: session?.user?.email,
      });
      if (resp.data.status === 200) {
        setNewAccounts(resp.data.allUsers);
        setFollowers(resp.data.followingUsers);
        
      } else {
      }
    };
    if (session) {
      fetchFollowing();
    }
  }, [session]);

  if (following && Followers) {
    console.log("followers : ", Followers);
    console.log("new User : " , NewAccounts);
    return (
      <div className="hidden w-1/4 md:block">
         <div className="w-full text-lg flex items-center justify-around border-b border-gray-700 p-2">
            <button className="hover:text-xl  w-1/2 text-sky-500 hover:underline" onClick={()=>{setFollwing(true)}}>
              Following
            </button>
            <button className="hover:text-xl hover:text-sky-500 hover:underline" onClick={()=>{setFollwing(false)}}>
              Follow more
            </button>
          </div>
        {Followers.map((user) => (
          <DisplayFollower 
          key={user.id}  
          username={user.username ?? ""}
          name={user.name ?? ""}
          email={session?.user?.email ?? ""}
          userId={user.id}
          ></DisplayFollower>
        ))}
      </div>
    );
  } else if (following && !Followers) {
    return <div>you are not following anyone yet!!</div>;
  }
  else if(NewAccounts && !following){
    return (
        <div className="hidden w-1/4 md:block">
          <div className="w-full text-lg flex items-center justify-around border-b border-gray-700 p-2">
            <button className="hover:text-xl  w-1/2 hover:text-sky-500 hover:underline" onClick={()=>{setFollwing(true)}}>
              Following
            </button>
            <button className="hover:text-xl text-sky-500 hover:underline" onClick={()=>{setFollwing(false)}}>
              Follow more
            </button>
          </div>
          {NewAccounts.map((user) => (
            <DisplayAccounts
              follower = {false}  
              key={user.id}  
              username={user.username ?? ""}
              name={user.name ?? ""}
              clientEmail={user.email ?? ""}
              userId={user.id}
            ></DisplayAccounts>
          ))}
        </div>
      );
}
}
