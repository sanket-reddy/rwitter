import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"


export const POST  = async(req: Request)=>{
    try{
        const {email} = await req.json();
        const users  = await prisma.user.findMany({});
        const client = await prisma.user.findUnique({where : {email : email}})
        if(client && users){
            const newFollowers = users.map(user => {
                const { followingIds, ...rest } = user;
                return rest;
            });

            return NextResponse.json({ status: 200, users: newFollowers });
        }   
    }catch(error){
        console.log(`an error has occured here : ${error}`);
        return NextResponse.json({status: 400, error});
    }
}

export const GET = async()=>{return NextResponse.json({status: 200})}