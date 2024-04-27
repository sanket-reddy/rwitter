interface UserDetials {
  username: string;
  name: string;
  currentUserEmail?: string;
  displayUserEmail?: string;
}

export default function ManyUsers(props: UserDetials) {
  return (
    <div className="p-3 border-b border-gray-700 w-full">
      <div className="flex gap-x-2">
        <img
          alt="profile pic"
          src="https://pics.craiyon.com/2023-05-31/220e4c73f6674d46a84840ebde9f9bc8.webp"
          height={50}
          width={50}
          className="rounded-full"
        />
        <h1>{props.name}</h1>
        <h1 className="text-neutral-700">@{props.username}</h1>
      </div>
      <div className="flex items-center justify-between mt-2 gap-x-4">
        <button className="bg-white hover:bg-gray-300 text-black p-2 rounded-full w-1/2">
          View Profile
        </button>
      </div>
    </div>
  );
}
