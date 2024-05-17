import Image from "next/image"
import FollowButton from "./followButton";
interface DisplayAccountsProps {
    username : string;
    name : string;
    follower ?: boolean;
    clientEmail : string;
    userId :string

}

export default function DisplayAccounts(props : DisplayAccountsProps){
  if(!props.follower){
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
      <FollowButton  userId={props.userId}></FollowButton>
      <button className="bg-white hover:bg-gray-300 text-black p-2 rounded-xl w-1/2">
        View Profile
      </button>
    </div>
  </div>
  }

}