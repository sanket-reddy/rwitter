"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ManyUsers from "./users";

export default function UsersBar() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>();
  useEffect(() => {
    const fetchUsers = async () => {
      if (session) {
        let response = await axios.post("/api/getusers", {
          email: session?.user?.email,
        });
        console.log(response.data);
        if (response.data.status === 200) {
          setUsers(response.data.users);
        }
      }
    };
    fetchUsers();
  }, [session]);
  if (session && users) {
    return (
      <div className="w-1/3">
        {session.user?.email}
        {users.map((user) => (
          <ManyUsers username={user.username} name={user.name}></ManyUsers>
        ))}
      </div>
    );
  }
  return <div className="w-1/4">usersBar</div>;
}
