import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"

export const POST = async(req : Request)=>{

    try{
        const {clientEmail} = await req.json();
        const client  = await prisma.user.findUnique({where : {email : clientEmail}})

        const followingIds = client?.followingIds;
        if(client && followingIds){
            const FollowingPromises  = followingIds.map(async (id)=>{
                const account = await prisma.user.findUnique({where : {id}})
                if(account){
                    return account
                }
            })
            const Following = await Promise.all(FollowingPromises);
            return NextResponse.json({status : 200, users : Following })     
        }
        return NextResponse.json({status: 200 , message : "no following"})
    }catch(error){
        console.log(`an error has occured here : ${error}`)
        return NextResponse.json({status: 500, error})
    }
}