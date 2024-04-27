import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export const POST = async (req: Request) => {
  try {
    const { email, username, name, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 7);

    const user = await prisma?.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json({ status: 200, user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400, message: "registration error" });
  }
};
