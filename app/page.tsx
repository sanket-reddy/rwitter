"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Tweet } from "@/components/tweet";

const Page = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const { data: session, status } = useSession();
  useEffect(() => {
    const getPosts = async () => {
      if (session) {
        try {
          const response = await axios.get("/api/tweets/getAll");
          if (response.data.status === 200) {
            console.log(response.data);

            const reversedPosts = response.data.posts.reverse();
            setPosts(reversedPosts);
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
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
