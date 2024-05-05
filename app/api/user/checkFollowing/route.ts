import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
export const POST = async (request: Request) => {
  try {
    let { clientEmail, userId } = await request.json();
    const client = await prisma?.user.findUnique({
      where: { email: clientEmail },
    });
    if (client) {
      let followingIds: string[] = client?.followingIds;
      let found: boolean = followingIds.includes(userId);
      if (found) {
        return NextResponse.json({ status: 200, message: "following" });
      }
      return NextResponse.json({ status: 200, message: "follow" });
    }
  } catch (error) {
    return NextResponse.json({ status: 400, error });
  }
};

export const PUT = async(request: Request)=>{
  try{  
    let {clientEmail,userId} = await request.json();
    let client = await prisma?.user.findUnique({where : {email : clientEmail}})
    if(client){
      let followingIds : string[] = client?.followingIds;
      let found = followingIds.includes(userId);
      if(found){
        return NextResponse.json({status : 200 ,message : "already following"})
      }
        await prisma.user.update({
          where: { email: clientEmail },
          data: { followingIds: { push: userId } },
        });  
        return NextResponse.json({status : 200, message : "successfully following"})  
    }   
}catch(error){
  return NextResponse.json({status : 400, error});
}
}