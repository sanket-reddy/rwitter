import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface LikeProps {
  postId: string;
  clientEmail: string;
}

interface ApiResponse {
  status?: number;
  message?: string;
  liked?: boolean; // Adding optional liked property to ApiResponse
}

export default function LikeButton(props: LikeProps) {
  const [liked, setLiked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkLike = async () => {
      try {
        const resp = await axios.post("/api/tweets/likePost", {
          postId: props.postId,
          clientEmail: props.clientEmail,
        });
        setLiked(resp.data.liked);
      } catch (error) {
        console.error("Error checking like status:", error);
        // Handle error gracefully
      }
    };
    checkLike();
  }, [props.postId, props.clientEmail]);

  const handleLike = async () => {
    try {
      const resp = await axios.put("/api/tweets/likePost", {
        postId: props.postId,
        clientEmail: props.clientEmail,
      });

      const responseData: ApiResponse = resp.data;

      if (responseData.status === 200) {
        setLiked(true);
        toast.success("Post liked");
      } else {
        toast.error(responseData.message || "Error liking post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("An error occurred while liking the post");
    }
  };

  const handleUnlike = async () => {
    try {
      const resp = await axios.post("/api/tweets/unlikePost", {
        clientEmail: props.clientEmail,
        postId: props.postId,
      });
      if (!resp.data.liked) {
        setLiked(false);
        toast.success("Post unliked");
      }
    } catch (error) {
      console.error("Error unliking post:", error);
      toast.error("An error occurred while unliking the post");
    }
  };

  if (liked === true) {
    return (
      <button onClick={handleUnlike}>
        <FcLike size={24} />
      </button>
    );
  } else if (liked === false) {
    return (
      <button onClick={handleLike}>
        <FaRegHeart size={24} />
      </button>
    );
  } else {
    return null; // Render nothing while the like status is being checked
  }
}
