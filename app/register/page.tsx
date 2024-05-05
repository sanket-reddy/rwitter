"use client";
import Button from "@/components/button";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
const SignInSchema = z.object({
  username: z
    .string()
    .min(3, { message: "minimum of 3 characters are required" }),
  password: z
    .string()
    .min(3, { message: "minimum of 3 characters are required" }),
  name: z.string().min(3, { message: "minimum of 3 characters are required" }),
  email: z.string().min(3, { message: "minimum of 3 characters are required" }),
});

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const handleSubmit = async () => {
    try {
      const validatedData = SignInSchema.parse({
        username,
        password,
        email,
        name,
      });
      const response = await axios.post("/api/register", validatedData);
      console.log(response);
      if (response.data.status === 200) {
        toast.success("Account created");
        signIn("credentials", {
          email,
          password,
        });
      } else {
        setInfo(response.data.message);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("invalid format");
      } else {
        setInfo("An error occurred while submitting the form.");
      }
    }
  };

  if (session) {
    router.push("/");
    return null;
  }
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden fixed inset-0 z-20 outline-none flex flex-col bg-opacity-30 gap-y-2 items-center justify-center">
      <h1 className="text-2xl">Create an account below</h1>
      <div className="card p-3 flex flex-col gap-y-2 w-auto border text-black bg-white border-white md:mx-0 lg:w-1/3 h-auto rounded-lg ">
        <h1>enter the name</h1>
        <input
          type="text"
          className="text-black border rounded-md h-12 border-black"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="enter minimum of 3 characters"
        ></input>
        <h1>enter the username</h1>
        <input
          type="text"
          placeholder="enter minimum of 3 characters"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="text-black border rounded-md  h-12 border-black"
        ></input>
        <h1>enter the email</h1>
        <input
          type="text"
          className="text-black border rounded-md h-12 border-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="enter minimum of 3 characters"
        ></input>

        <h1>enter the password</h1>
        <input
          type="password"
          className="text-black border rounded-md h-12 border-black"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="enter minimum of 3 characters"
        ></input>

        <Button
          content="SUBMIT"
          fullWidth={true}
          onClick={handleSubmit}
        ></Button>
        <h1>{info}</h1>
        <div className="flex items-center justify-center gap-6">
          <Link href="/sign-in">
            <p className=" hover:underline hover:text-bold">
              Already have an account ?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
