"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tweet } from "@/components/tweet";
import { useSession } from "next-auth/react";
import {z} from "zod"

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

const commentParse = z.object({
  commentBody : z.string().min(3)
})

export default function Page({ params }: { params: { slug: string } }) {
  const { data: session } = useSession();
  const [commentBody, setCommentBody] = useState<string>("");
  const [allComments ,setAllComments] = useState<any[]>();  
  const postId = params.slug[0];
  const [post, setPost] = useState<PostTypes>();
  useEffect(() => {
    const fetchPost = async () => {
      let resp = await axios.post("/api/getAllTweets/specific", {
        postId,
      }); 
      if (resp.data.status === 200) {
        setPost(resp.data.post);
        const commentResp = await axios.post("/api/comments/getComments",{postId});
        if(commentResp.data.status === 200){
          setAllComments(commentResp.data.comments)
        }
        else{
          console.log("something went wrong : ");
        }
        
      } else {
        toast.error("something went wrong");
      }
    };
    fetchPost();


  }, [postId]);



  const addComment = async()=>{
    try{
      const valideComment = commentParse.parse({commentBody});
      console.log(valideComment);
      let resp = await axios.post("/api/comments/addOne",{
        body : valideComment.commentBody,
        postId,
        userId : post?.userId
      })
      console.log("the commentBody api response is : ",resp.data);
      if(resp.data.status === 200){
        toast.success(resp.data.message)
        return
      }
      toast.error(resp.data.message)
      return
    }catch(error){
      if (error instanceof z.ZodError) {
        toast.error("enter the value in specified format");

      }
      else{
        console.log("an error has occured : ",error)
        toast.error("something went wrong")
          
      }
    }
  }




  if (!post) {
    return (
      <div className="flex w-full justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  } else if( post && allComments) {
    console.log("all the comments : ",allComments);
    return (
      <div className="w-full ">
        <div>
          <Tweet
            postId={post.id}
            username={post.postedBy.username}
            name={post.postedBy.name}
            time={post.updatedAt}
            body={post?.body}
            clientEmail={session?.user?.email ?? ""}
          ></Tweet>
        </div>
        <textarea
          onChange={(e) => {
            setCommentBody(e.target.value);
          }}
          placeholder="enter your comment here"
          className="w-full mt-1 h-[130px] rounded-xl border border-gray-500 bg-neutral-800"
        ></textarea>
        <div className="flex justify-end my-3">
          <button className="bg-white text-black hover:bg-neutral-300 p-3 w-1/4 rounded-xl" onClick={addComment}>
            Comment
          </button>
        </div>
        <div>
          {allComments.map((item)=>(
                      <Tweet
                      key={item.id}
                      body={item.body}
                      time={new Date(item.createdAt)}
                      name={post.postedBy?.name}
                      username={post.postedBy?.username}
                      postId = {post.id}
                      clientEmail = {session?.user?.email ?? ""}
                    />
          ))}
        </div>
      </div>
    );
  }
}
