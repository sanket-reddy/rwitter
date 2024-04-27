import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const serverAuth = async (req: NextResponse, res: NextResponse) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("not signed in");
  }
  const currentUser = await prisma?.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    throw new Error("not signed in");
  }
  return { currentUser };
};
