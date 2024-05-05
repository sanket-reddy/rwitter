"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Tweet } from "@/components/tweet";

const Page = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const { data: session, status } = useSession();
  console.log(session);
  useEffect(() => {
    const getPosts = async () => {
      if (session) {
        try {
          const response = await axios.post("/api/getAllTweets");
          if (response.data.status === 200) {
            setPosts(response.data.posts);
          }
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      }
    };
    getPosts();
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <h1>Not logged in</h1>;
  }

  return (
    <div className="w-full">
      <h1 className="border-b flex justify-center border-gray-700 pb-2 pt-4 text-2xl">
        Home
      </h1>
      <div>
        {posts.map((post) => (
          <Tweet
            key={post.id}
            body={post.body}
            time={new Date(post.createdAt)}
            name={post.postedBy?.name}
            username={post.postedBy?.username}
            postId = {post.id}
            clientEmail = {session.user?.email ?? ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
