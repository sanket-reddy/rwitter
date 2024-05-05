import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    let posts = await prisma?.posts.findMany({
      // include: {
        // postedBy: true,
      // },
    });
    // const reversedPosts = posts.reverse();
    if (posts) {
      const response = NextResponse.json({ status: 200, posts });
      response.headers.append(
        "Cache-Control",
        "no-cache, no-store, must-revalidate"
      );
      return response;
    }
  } catch (error) {
    console.log("an error has occured:  ", error);
    return NextResponse.json({
      status: 400,
      message: "an error has occured check console",
    });
  }
};
