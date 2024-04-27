import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaFeather, FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { SignOutButton } from "./signOutButton";
const SideBar: React.FC = async () => {
  const items = [
    { label: "Home", href: "/home", Icon: BsHouseFill },
    { label: "Notifications", href: "/notifications", Icon: BsBellFill },
    { label: "Profile", href: "/profile", Icon: FaUser },
  ];
  const session = await getServerSession();
  console.log(session);
  return (
    <div className="border-r flex flex-col items-center min-h-screen h-full w-1/6 border-gray-900">
      <Link href="/feed">
        <Image
          alt="logo"
          src="/logo01.png"
          className="m-7"
          width={50}
          height={50}
        />
      </Link>
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex flex-col items-center p-4 hover:bg-blue-500 w-full"
        >
          <item.Icon size={24} />
          <span className="hidden md:block">{item.label}</span>
        </Link>
      ))}
      {session ? (
        <SignOutButton isSession={true}></SignOutButton>
      ) : (
        <SignOutButton isSession={false}></SignOutButton>
      )}

      <Link
        href="/tweet"
        className="bg-blue-500 mt-7  hover:bg-opacity-80 cursor-default transition rounded-full h-14 w-14 flex items-center justify-center"
      >
        <button>
          <FaFeather size={24} color="white"></FaFeather>
        </button>{" "}
      </Link>
    </div>
  );
};

export default SideBar;
