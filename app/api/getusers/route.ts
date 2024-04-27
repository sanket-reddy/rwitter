import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    let { email } = await request.json();
    let allUsers = await prisma?.user.findMany({});
    const remainingUsers = allUsers.filter((item) => item.email !== email);
    return NextResponse.json({ status: 200, users: remainingUsers });
  } catch (error) {
    console.log("an error has occured here : ", error);
    return NextResponse.json({ status: 400, error });
  }
};
