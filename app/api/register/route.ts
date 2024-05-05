import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export const POST = async (req: Request) => {
  try {
    const { email, username, name, password } = await req.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json({ status: 400, message: "User already exists with provided email or username." });
    }

    const hashedPassword = await bcrypt.hash(password, 7); // Higher cost factor for bcrypt

    await prisma.$transaction([
      prisma.user.create({
        data: {
          email,
          username,
          name,
          hashedPassword,
        },
      }),
    ]);

    return NextResponse.json({ status: 200, message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ status: 500, message: "Internal server error occurred during registration." });
  }
};
