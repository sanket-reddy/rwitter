"use client";
import Button from "@/components/button";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { stat } from "fs";
const SignUpSchema = z.object({
  email: z.string().min(3, { message: "minimum of 3 characters are required" }),
  password: z
    .string()
    .min(3, { message: "minimum of 3 characters are required" }),
});

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const { data: session } = useSession();
  const handleSubmit = async () => {
    try {
      setStatus("loading");
      const validatedData = SignUpSchema.parse({ email, password });
      const response = await axios.post("/api/login", validatedData);
      if (response.data.status === 200) {
        signIn("credentials", {
          email,
          password,
        });
      } else {
        setInfo(response.data.message);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert("enter the value in specified format");
      } else {
        setInfo("An error occurred while submitting the form.");
      }
    }
  };
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <h1>Loading ...</h1>
      </div>
    );
  }
  if (session) {
    router.push("/");
    return null;
  }
  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-center">
      <h1 className="text-2xl">Login below</h1>
      <div className="card p-3 flex flex-col gap-y-2 w-auto mx-2 text-black md:mx-0 lg:w-1/3 h-auto rounded-lg bg-gray-100">
        <h1 className="text-black">Enter the email </h1>
        <input
          type="text"
          placeholder="enter minimum of 3 characters "
          className="text-black border rounded-md  h-12 border-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <h1 className="text-black">Enter the password </h1>
        <input
          type="password"
          className="text-black border rounded-md h-12 border-black"
          placeholder="enter minimum of 3 characters "
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <Button
          content="SUBMIT"
          onClick={handleSubmit}
          fullWidth={true}
        ></Button>
        <div className="flex items-center justify-center gap-6">
          <Link href="/register">
            <p className="text-black  hover:underline">
              Create an new account?
            </p>
          </Link>
        </div>
        <h1 className="">{info}</h1>
      </div>
    </div>
  );
}
