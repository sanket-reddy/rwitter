import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();
    const user = await prisma?.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "no user found", status: 400 });
    }
    const hashedPassword = user.hashedPassword;
    const passwordValid = await bcrypt.compare(password, hashedPassword);
    if (passwordValid) {
      return NextResponse.json({ status: 200, message: "user found" });
    }
    return NextResponse.json({ status: 400, message: "invalid credentials" });
  } catch (error) {
    console.log("an error occured while login : ", error);
    return NextResponse.json({
      status: 400,
      message: "an error has occured while login",
    });
  }
};
