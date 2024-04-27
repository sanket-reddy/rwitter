"use client";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState<boolean>(false);
  if (!liked) {
    return (
      <button
        onClick={() => {
          setLiked(true);
        }}
      >
        <FaRegHeart size={24}></FaRegHeart>
      </button>
    );
  } else {
    return (
      <button
        onClick={() => {
          setLiked(false);
        }}
      >
        <FcLike size={24}></FcLike>
      </button>
    );
  }
}
