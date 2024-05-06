"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Tweet } from "@/components/tweet";
import { useSession } from "next-auth/react";

interface PostTypes {
  body : string,
  id : string,
  likeIds : string[],
  userId : string
  updatedAt : Date
  postedBy : {
    username : string,
    name : string,
  }

}

export default  function Page({ params }: { params: { slug: string } }) {
  const {data:session} = useSession()
  const postId = params.slug[0];
  const [post,setPost] = useState<PostTypes>();
  useEffect(()=>{
    const fetchPost=  async()=>{
      let resp = await axios.post("/api/getAllTweets/specific",{
        postId
      })
      if(resp.data.status === 200){
        setPost(resp.data.post)

      }
      else{
        toast.error("something went wrong")
      }
    }
    fetchPost()
  },[])    

  console.log(post)
  
if(!post){
  return <div className="flex w-full justify-center items-center">
    <h1>Loading...</h1>
  </div>
}
else{
  return <div className="w-full ">
    <Tweet postId={post.id} username = {post.postedBy.username} name = {post.postedBy.name} time ={post.updatedAt} body = {post?.body} clientEmail={session?.user?.email ?? ""}></Tweet>
  </div>
  

  }

}