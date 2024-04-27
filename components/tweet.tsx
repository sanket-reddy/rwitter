import { formatDate } from "date-fns";
import { FaComments } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
interface tweetDetials {
  body?: string;
  time?: Date;
  name?: string;
  username?: string;
}

import LikeButton from "./likeButton";
export const Tweet = (props: tweetDetials) => {
  const formattedDate = props.time ? formatDate(props.time, "ppp") : "";
  return (
    <div className="  h-1/5  border border-gray-800">
      <div className="flex gap-x-4 items-center h-auto ml-3">
        <img
          src="https://imgs.search.brave.com/i96gWKJCbQQzfw7STlnvQ9HlCRwn5xV0_zBptQLqvlY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzQ1Lzc0LzA4/LzM2MF9GXzE0NTc0/MDg3OF9kRERUdGhx/cTFpakhidWFsb0x6/N2dueXhERkw1YUZZ/NC5qcGc"
          className="rounded-full h-10"
        ></img>
        <h1 className="text-lg">{props.name}</h1>
        <h1 className="text-neutral-600 text-md">@{props.username}</h1>
        <h1 className="text-sm text-neutral-400">{formattedDate}</h1>
      </div>
      <div>
        <h1 className="m-5">{props.body}</h1>
      </div>
      <div className="m-5 flex gap-5 items-center ">
        <FaComments size={24}></FaComments>
        <LikeButton></LikeButton>
      </div>
    </div>
  );
};
