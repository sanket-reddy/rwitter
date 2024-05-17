import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
  try {
    let { email, userId } = await request.json();
    let user = await prisma.user.findUnique({
      where: { email }
      // data: { followingIds: { push: userId } },
    });    

    if(user){
      let followingIds :string[] = user.followingIds;
      let found = followingIds.includes(userId)
      if(found){
        return NextResponse.json({status : 200 , message : "following already"})
      }
      else{
        let updated =  await prisma.user.update({where : {email}, data : {followingIds : {push : userId}}});
        if(updated){
          return NextResponse.json({status : 200, message :"following successfully",})
        }
      }
    }
    return NextResponse.json({status : 404 , message : "no user found"});
  } catch (error) {
    console.log("an error has occured : ", error);
    return NextResponse.json({ status: 400, error });
  }
};
