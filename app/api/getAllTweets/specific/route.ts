import { NextResponse } from "next/server";

export const POST = async (request : Request)=>{
    try{
        let {postId} = await request.json();
        const post = await prisma?.posts.findUnique({where: {id : postId},
            include : {postedBy :true}
        });
        return NextResponse.json({status :200, post })    
    }catch(error){
        console.log(`an error has occured here ${error}`)
        return NextResponse.json({status : 400 , error})
    }
    
}