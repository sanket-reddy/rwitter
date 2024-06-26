import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import SideBar from "@/components/sidebar";

import FollowersBar  from "@/components/followersBar";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "X-clone",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <Toaster />
          <div className="flex">
            <SideBar></SideBar>
            {children}
            {/* <UsersBar></UsersBar> */}
            <FollowersBar></FollowersBar>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
