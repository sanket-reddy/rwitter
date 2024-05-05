import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"
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
