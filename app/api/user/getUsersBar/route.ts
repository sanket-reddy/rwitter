import {  User } from "@prisma/client";
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { email } = await req.json();
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            const followingIds: string[] = user.followingIds;
            let allUsers = await prisma.user.findMany({});
            let followingUsers: User[] = [];
            allUsers = allUsers.filter((u)=>u.email !==email);
            followingIds.forEach((id) => {
                const followingUser = allUsers.find((u) => u.id === id);
                if (followingUser) {
                    followingUsers.push(followingUser);
                    allUsers = allUsers.filter((u) => u.id !== id);
                }
            });


            return NextResponse.json({status : 200, allUsers, followingUsers});
            
        }

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({status : 400 ,message  : "something went wrong", error})
    }
};
