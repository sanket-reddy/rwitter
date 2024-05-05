import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
  try {
    let { clientEmail, userId } = await request.json();
    await prisma.user.update({
      where: { email: clientEmail },
      data: { followingIds: { push: userId } },
    });    
    return NextResponse.json({ status: 200, message: "sucessfully following" });
  } catch (error) {
    console.log("an error has occured : ", error);
    return NextResponse.json({ status: 400, error });
  }
};
