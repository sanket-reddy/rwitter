import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export const POST = async (req: Request) => {
  try {
    let { clientEmail, postId } = await req.json();
    let client = await prisma.user.findUnique({
      where: { email: clientEmail },
    });
    if (client) {
      let clientId = client.id;
      const post = await prisma.posts.findUnique({ where: { id: postId } });

      if (post) {
        // Remove clientId from likedids array
        const updatedLikedIds = post.likedids.filter(id => id !== clientId);

        // Update the post with the modified likedids
        await prisma.posts.update({
          where: { id: postId },
          data: { likedids: { set: updatedLikedIds } }
        });

        return NextResponse.json({ status: 200, message: "Like removed successfully", liked : false } );
      } else {
        return NextResponse.json({ status: 404, error: "Post not found" });
      }      
    }
  } catch (error) {
    console.log("an error has occured here  : ", error);
    return NextResponse.json({ status: 400, error });
  }
};
