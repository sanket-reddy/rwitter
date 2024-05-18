import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
export const PUT = async (req: Request) => {
  try {
    const { email, userId } = await req.json();
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const updatedFollowingIds = user.followingIds.filter((id: string) => id !== userId);

      await prisma.user.update({
        where: { email },
        data: { followingIds: updatedFollowingIds },
      });

      return NextResponse.json({
        status: 200,
        message: "successfully unfollowed",
      });
    } 
      return NextResponse.json({ status: 200, message: "no user found" });

  } catch (error) {
    console.log(`an error has occured over here  : ${error}`);
    return NextResponse.json({ status: 400, error });
  }
};
