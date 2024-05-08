import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server";

export const POST  = async(request  :Request)=>{
    try{
        let {email} = await request.json();
        const user = await prisma.user.findUnique({where : {email}, include : {post : true, comments : true}});
        if(user){
            return NextResponse.json({status : 200 ,user, message : "user found"});
        }
        return NextResponse.json({status: 404, message : "no user has found"})

    }catch(error) {
        console.log(`an error has occured herer ${error}`);
        return NextResponse.json({status : 400 ,error , message: "error occured"});
    }
}
