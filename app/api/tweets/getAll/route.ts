import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    let posts = await prisma?.posts.findMany({
      include: {
        postedBy: true,
      },
    });
    if (posts) {
      return NextResponse.json({ status: 200, posts });
    }
  } catch (error) {
    console.log("an error has occured:  ", error);
    return NextResponse.json({
      status: 400,
      message: "an error has occured check console",
    });
  }
};
