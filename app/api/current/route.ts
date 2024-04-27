import { serverAuth } from "@/libs/serverAuth";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, res: NextResponse) => {
  try {
    const req = await request.json();
    const { currentUser } = await serverAuth(req, res);
    return NextResponse.json({ status: "200", currentUser });
  } catch (error) {
    console.error("An error has occurred:", error);
    return NextResponse.json({ status: "400", error });
  }
};
