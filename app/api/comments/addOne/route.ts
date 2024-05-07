import { NextResponse } from "next/server";

export const POST = async(request : Request)=>{
    try{
        const {userId,postId,body} = await request.json();
        const comment = await prisma?.comment.create({data : {userId , postId,body}});
        if(comment){
            return NextResponse.json({status : 200 , message : "comment added successful"})
        }
        return NextResponse.json({status : 400 , message : "comment not was added"})

    }catch(error){
        console.log(`an error has occured here : ${error}`);
        return NextResponse.json({status: 400 ,error})
    }
}