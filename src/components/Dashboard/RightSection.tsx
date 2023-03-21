import { userAtom } from "@/jotai/user";
import { useAtom } from "jotai";
import React from "react";

const RightSection = () => {
  const [user, setUser] = useAtom(userAtom);
  if (!user) return null;
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <img
          className="h-32 w-32 rounded-full"
          src={user.image || "/images/default-user.png"}
          alt="user"
        />
        <h1 className="mt-2 text-2xl font-semibold">{user.name}</h1>
        <p className="text-sm font-medium text-gray-500">{user.email}</p>

        {/** FOLLOWERS AND FOLLOWING */}
        <div className="mt-4 flex w-full flex-col">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-500">Followers</p>
            <p className="text-sm font-medium text-gray-500">Following</p>
          </div>
          <div className="flex justify-between px-5">
            <p className="text-2xl font-semibold text-gray-900">0</p>
            <p className="text-2xl font-semibold text-gray-900">0</p>
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col">
          <button className="w-full rounded-md border-2 bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 py-2 text-white">
            Update Profile
          </button>
          <button className="mt-2 w-full rounded-md border-2 bg-white px-4 py-2 text-black">
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default RightSection;
