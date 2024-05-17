"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Ids {
  userId: string;
}

export default function FollowButton(props: Ids) {
  // const [following, setFollwing] = useState<string>("");
  const {data :session} = useSession();
  // useEffect(() => {
  //   const checkForFollowing = async () => {
  //     let resp = await axios.post("/api/user/checkFollowing", {
  //       clientEmail: props.clientEmail,
  //       userId: props.userId,
  //     });
  //     if(resp.data.status === 200){
  //         setFollwing(resp.data.message);
  //     }else{
  //       setFollwing("error ocuured")
  //     }
  //   };
  //   checkForFollowing();
  // }, []);

  // return (
  //   <button
  //     onClick={async () => {
  //       if(following !== "following"){
  //         let response = await axios.put("/api/user/checkFollowing", {
  //           clientEmail: props.clientEmail,
  //           userId: props.userId,
  //         });
  //         if (response.data.status === 200) {
  //           toast.success("success");
  //           setFollwing("following");
  //         }
  //       }
 
  //     }}
  //     className="bg-white hover:bg-neutral-300 hover:bg-opacity-90 text-black p-2 rounded-xl w-1/2"
  //   >
  //     {following}
  //   </button>
  // );

  return  <button className="bg-white hover:bg-neutral-300 hover:bg-opacity-90 text-black p-2 rounded-xl w-1/2"
    onClick={async()=>{
      console.log("email is : ", session?.user?.email)
      console.log("userId : " ,props.userId)
      let resp = await axios.post("/api/user/followUser",{email : session?.user?.email, userId : props.userId});
      if (resp.data.status === 200) {
                  toast.success(resp.data.message);
        }
        else{
          toast.error("something went wrong !!!")
        }
    }}
  >Follow</button>
}
