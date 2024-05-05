import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"
export const POST = async()=>{
    try{
        let posts = await prisma.posts.findMany({
            include:{
                postedBy :true
            }
        })
        if(posts){
            const reversedPosts = posts.reverse();
            return NextResponse.json({status : 200 , posts :reversedPosts})
        }
        return NextResponse.json({status  : 200 , message : "no posts yet"})
    }catch(error){
        console.log("an error has occured : ",error);
        return NextResponse.json({status : 400, error})
    }
}