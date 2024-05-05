"use client"

import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface LikeProps {
  postId: string;
  clientEmail: string;
}

interface ApiResponse {
  status: number;
  message: string;
}

export default function LikeButton(props: LikeProps) {
  const [liked, setLiked] = useState<boolean>(false);

  const handleLike = async () => {
    try {
      console.log(props.clientEmail, props.postId);
      // Make HTTP request
      const resp = await axios.put("/api/tweets/likePost", {
        postId: props.postId,
        clientEmail: props.clientEmail, 
      });

      const responseData: ApiResponse = resp.data;

      if (responseData.status === 200) {
        setLiked(true);
        toast.success("Post liked");
        console.log("Post liked");
      } else {
        toast.error(responseData.message || "Error liking post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("An error occurred while liking the post");
    }
  };

  return (
    <button onClick={liked ? () => setLiked(false) : handleLike}>
      {liked ? <FcLike size={24} /> : <FaRegHeart size={24} />}
    </button>
  );
}
