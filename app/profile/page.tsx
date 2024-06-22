"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Tweet } from "@/components/tweet";
import EditProfile from "@/components/popups/EditProfile";

interface PostDetials {
  id: string;
  body: string;
  updatedAt: Date;
}

interface CommentDetials {
  id: string;
  body: string;
  updatedAt: Date;
}

interface userDetials {
  name: string;
  username: string;
  email: string;
  followingIds: string[];
  post: PostDetials[];
  comments: CommentDetials[];
}

export default function Page() {
  const { data: session } = useSession();
  const [user, setUser] = useState<userDetials>();
  const [showTweets, setShowTweets] = useState<boolean>(true);
  const [showComments, setShowCommensts] = useState<boolean>(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);

  const commentsClass = showComments ? "block" : "hidden";
  const tweetsClass = showTweets ? "block" : "hidden";
  const blurClass = isEditProfileOpen ? "" : "";

  useEffect(() => {
    const fetchProfile = async () => {
      let resp = await axios.post("/api/user/getProfile", {
        email: session?.user?.email,
      });
      if (resp.data.status === 200) {
        console.log(resp.data.user);
        setUser(resp.data.user);
      }
    };
    fetchProfile();
  }, [session]);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Loading ...</h1>
      </div>
    );
  } else if (session && user) {
    return (
      <div className={`w-full relative ${blurClass}`}>
        {isEditProfileOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <EditProfile onClose={() => setIsEditProfileOpen(false)} />
            {/* <EditProfile></EditProfile> */}
          </div>
        )}
        <div className="cover-image-container">
          <Image
            src="/twitter-cover.jpg"
            height={90}
            width={1100}
            alt="cover pic"
          />
        </div>
        <div className="w-full justify-center">
          <div className="profile-image-container absolute top-20 md:top-60 left-4">
            <Image
              src="/profilepic.jpg"
              height={100}
              width={140}
              className="border border-black rounded-full"
              alt="profile pic"
            />
          </div>

          <div className="flex flex-col gap-y-1 mb-2 ml-10 mt-20 md:mt-9">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl">{session.user?.name}</h1>
              <button
                className="bg-white text-black p-2 px-4 rounded-xl shadow-sm hover:bg-gray-300"
                onClick={() => setIsEditProfileOpen(true)}
              >
                Edit
              </button>
            </div>
            <h1 className="text-lg text-neutral-600">@{user?.username}</h1>
            <h1 className="text-md">Following {user.followingIds.length}</h1>
          </div>
        </div>
        <div className="text-xl p-4 flex justify-around">
          <div className="border-r w-1/3 border-gray-200">
            <button
              className="hover:text-2xl hover:text-sky-500"
              onClick={() => {
                setShowTweets(true);
                setShowCommensts(false);
              }}
            >
              Tweets
            </button>
          </div>
          <button
            className="hover:text-2xl hover:text-sky-500"
            onClick={() => {
              setShowTweets(false);
              setShowCommensts(true);
            }}
          >
            Comments
          </button>
        </div>

        <div className={tweetsClass}>
          {user.post.map((tweet) => (
            <Tweet
              key={tweet.id}
              username={user.username}
              postId={tweet.id}
              clientEmail={user.email}
              time={tweet.updatedAt}
              name={user.name}
              body={tweet.body}
            ></Tweet>
          ))}
        </div>

        <div className={commentsClass}>
          {user.comments.map((comment) => (
            <Tweet
              key={comment.id}
              username={user.username}
              postId={comment.id}
              clientEmail={user.email}
              time={comment.updatedAt}
              name={user.name}
              body={comment.body}
              comment={true}
            ></Tweet>
          ))}
        </div>
      </div>
    );
  }
}
