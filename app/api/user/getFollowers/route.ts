import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"

export const POST = async(request :Request)=>{

    try{
        const {clientEmail} = await request.json();
        const user = await prisma?.user.findUnique({where : {email : clientEmail} })
        if(user){
            const FollowingIds = user?.followingIds;
            return NextResponse.json({status : 200, FollowingIds})
        }
        return NextResponse.json({status : 404, message : "no user found"});

    }catch(error){
        console.log("some error has occured : ",error)
        return NextResponse.json({status : 400, error});
    } 
}