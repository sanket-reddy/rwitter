import Image from "next/image"
import axios from "axios";
import toast from "react-hot-toast";
import { getServerSession } from "next-auth";
interface DisplayAccountsProps {
    username : string;
    name : string;
    email : string;
    userId :string
}


export default function DisplayFollower( props : DisplayAccountsProps){
  const handleUnfollow = async () => {
    try{
      const resp = await axios.put("/api/user/unFollowUser",{
        email : props.email,
        userId : props.userId
      })
      console.log("resp of unfollow : ",resp.data);
      console.log("userId : ",props.userId);
      console.log("email : ",props.email);

      if(resp.data.status === 200){
        toast.success("unfollowed");
      }
      else{
        toast.error("something went wrong")
      }
    }catch(error){
      console.log("an error while unfollow : ",error);
      toast.error("something went wrong")
      
    }

  }
    return <div className="p-3 border-b border-gray-700 w-full">
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
    <button className="bg-white hover:bg-gray-300 text-black p-2 rounded-xl w-1/2"
    onClick={handleUnfollow}
  >
        UnFollow
      </button>
      <button className="bg-white hover:bg-gray-300 text-black p-2 rounded-xl w-1/2">
        View Profile
      </button>
    </div>
  </div>

}