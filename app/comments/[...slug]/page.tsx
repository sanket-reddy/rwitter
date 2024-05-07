"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tweet } from "@/components/tweet";
import { useSession } from "next-auth/react";
import { z, ZodError } from "zod";

interface PostTypes {
  body: string;
  id: string;
  likeIds: string[];
  userId: string;
  updatedAt: Date;
  postedBy: {
    username: string;
    name: string;
  };
}

interface Comment {
  id: string;
  body: string;
  createdAt: Date;
}

const commentParse = z.object({
  commentBody: z.string().min(3),
});

export default function Page({ params }: { params: { slug: string } }) {
  const { data: session } = useSession();
  const [commentBody, setCommentBody] = useState<string>("");
  const [allComments, setAllComments] = useState<Comment[]>([]); // Define proper type for comments
  const postId = params.slug[0];
  const [post, setPost] = useState<PostTypes | null>(null); // Initialize post state with null
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const [postResp, commentResp] = await Promise.all([
          axios.post("/api/getAllTweets/specific", { postId }),
          axios.post("/api/comments/getComments", { postId }),
        ]);

        if (postResp.data.status === 200) {
          setPost(postResp.data.post);
        } else {
          toast.error("Something went wrong while fetching post");
        }

        if (commentResp.data.status === 200) {
          setAllComments(commentResp.data.comments);
        } else {
          toast.error("Something went wrong while fetching comments");
        }
      } catch (error) {
        console.error("An error occurred while fetching post and comments:", error);
        toast.error("Failed to fetch post and comments");
      }
    };
    fetchPost();
  }, [postId]);

  const addComment = async () => {
    try {
      const validComment = commentParse.parse({ commentBody });
      const resp = await axios.post("/api/comments/addOne", {
        body: validComment.commentBody,
        postId,
        userId: post?.userId,
      });
      if (resp.data.status === 200) {
        toast.success(resp.data.message);
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error("Enter the value in specified format");
      } else {
        console.error("An error occurred while adding comment:", error);
        toast.error("Something went wrong");
      }
    }
  };

  if (!post) {
    return (
      <div className="flex w-full justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <div>
          <Tweet
            postId={post.id}
            username={post.postedBy.username}
            name={post.postedBy.name}
            time={post.updatedAt}
            body={post.body}
            clientEmail={session?.user?.email ?? ""}
          />
        </div>
        <textarea
          onChange={(e) => {
            setCommentBody(e.target.value);
          }}
          placeholder="Enter your comment here"
          className="w-full mt-1 h-[130px] rounded-xl border border-gray-500 bg-neutral-800"
        ></textarea>
        <div className="flex justify-end my-3">
          <button className="bg-white text-black hover:bg-neutral-300 p-3 w-1/4 rounded-xl" onClick={addComment}>
            Comment
          </button>
        </div>
        <div>
          {allComments.map((comment) => (
            <Tweet
              key={comment.id}
              body={comment.body}
              time={new Date(comment.createdAt)}
              name={post.postedBy?.name}
              username={post.postedBy?.username}
              postId={post.id}
              clientEmail={session?.user?.email ?? ""}
            />
          ))}
        </div>
      </div>
    );
  }
}
