import { NextResponse } from "next/server";

export const POST = async(request : Request)=>{
    try{
        let {postId} = await request.json();
        let comments = await prisma?.comment.findMany({where : {postId }});
        comments = comments?.reverse();
        return NextResponse.json({status : 200, comments});
    }catch(error){
        console.log(`an error has occured here ${error}`);
        return NextResponse.json({status : 400 ,error})
    }
}