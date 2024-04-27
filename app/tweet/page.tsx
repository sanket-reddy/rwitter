"use client";

import Button from "@/components/button";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [body, setBody] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const { data: session } = useSession();
  const email = session?.user?.email;
  const handleTweet = async () => {
    let response = await axios.post("/api/tweet", { body, email });
    if (response.data.status === 200) {
      toast.success("posted successfully");
      router.push("/");
    } else {
      setInfo("something went wrong");
    }
  };
  return (
    <div className="flex   w-full justify-center items-center  ">
      <div className="w-1/2 flex flex-col gap-y-3  bg-white p-4 text-black h-1/2">
        <h2>Tweet below</h2>
        <textarea
          onChange={(e) => {
            setBody(e.target.value);
          }}
          className="w-full h-3/4 border border-black rounded-xl"
        ></textarea>
        <Button
          secondary={true}
          content="Tweet"
          fullWidth={true}
          onClick={handleTweet}
        ></Button>
        <h1>{info}</h1>
      </div>
    </div>
  );
}
