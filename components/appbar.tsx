import Image from "next/image";
import Button from "./button";
import Link from "next/link";
export default function Appbar() {
  return (
    <div className="border-b border-gray flex p-2 items-center justify-between">
      <Image alt="logo" src="/logo01.png" width={50} height={50} />
      <div className="flex gap-x-2">
        <Link href="/signIn">
          <Button content="Sign in" />
        </Link>
        <Link href="/signup">
          <Button content="Sign up" />
        </Link>
      </div>
    </div>
  );
}
