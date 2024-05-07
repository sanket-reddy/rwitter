import { formatDate } from "date-fns";
import { FaComments } from "react-icons/fa";
interface tweetDetials {
  body?: string;
  time?: Date;
  name?: string;
  username?: string;
  postId :string;
  clientEmail :string
}

import LikeButton from "./likeButton";
import Image from "next/image";
import Link from "next/link";
export const Tweet = (props: tweetDetials) => {
  const slug = props.postId
  const formattedDate = props.time ? formatDate(props.time, "ppp") : "";
  return (
    <div className="  h-1/5 pb-1  border border-gray-800">
      <div className="flex gap-x-4 items-center h-auto ml-3">
        <Image
          alt="profile pic"
          src="/profilepic.jpg"
          height={50}
          width={50}
          className="rounded-full"
        />
        <h1 className="text-lg">{props.name}</h1>
        <h1 className="text-neutral-600 text-md">@{props.username}</h1>
        <h1 className="text-sm text-neutral-400">{formattedDate}</h1>
      </div>
      <div>
        <h1 className="m-5">{props.body}</h1>
      </div>
      <div className="m-5 flex gap-5 items-center ">
      <Link href= {`/comments/${slug}`}>
        <FaComments size={24}></FaComments>
        </Link>
        <LikeButton clientEmail={props.clientEmail} postId={props.postId}></LikeButton>
      </div>
    </div>
  );
};
