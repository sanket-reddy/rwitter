import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const POST = async (request: Request) => {
  try {
    const { clientEmail, postId } = await request.json();
    const client = await prisma.user.findUnique({
      where: {
        email: clientEmail,
      },
    });
    if (client) {
      let clientId = client.id;
      let post = await prisma.posts.findUnique({ where: { id: postId } });
      if(post){
        let LikedIds :string[]  = post?.likedids;
        let found = LikedIds.includes(clientId);
        if(found){
          return NextResponse.json({status : 200, liked : true})
        }
        return NextResponse.json({status : 200, liked : false})

      }

    }
  } catch (error) {
    console.log("an error has occured here : ", error);
    return NextResponse.json({ status: 400, error });
  }
};

export const PUT = async (request: Request) => {
  try {
    let { clientEmail, postId } = await request.json();
    let client = await prisma?.user.findUnique({
      where: {
        email: clientEmail,
      },
    });
    if (client) {
      let clientId = client.id;
      await prisma?.posts.update({
        where: { id: postId },
        data: { likedids: { push: clientId } },
      });
    }
    return NextResponse.json({ status: 200, message: "Liked" });
  } catch (error) {
    console.log("an error has occured here : ", error);
    return NextResponse.json({ status: 400, error });
  }
};
