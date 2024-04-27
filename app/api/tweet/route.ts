import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { body, email }: { body: string; email: string } = await req.json();
    const user = await prisma?.user.findUnique({
      where: {
        email,
      },
    });
    const userId: string = user?.id ?? "";
    if (body && userId) {
      const createPost = await prisma.posts.create({
        data: { body, userId },
      });
      if (createPost) {
        return NextResponse.json({
          status: 200,
          message: "succesfully posted",
        });
      }
    }
    return NextResponse.json({ status: 200, message: "content is empty" });
  } catch (error) {
    console.log("an error has occured while posting : ", error);
    return NextResponse.json({
      status: 400,
      message: "some problem has occured",
    });
  }
};
