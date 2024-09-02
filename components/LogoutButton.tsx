"use client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      onClick={() => {
        signOut({
          callbackUrl: "/",
        });
      }}
      className="flex items-center gap-1 cursor-pointer px-2 py-1.5 text-sm hover:bg-red-400 bg-red-300 w-full rounded-lg "
    >
      Logout <LogOutIcon className="h-4" />
    </button>
  );
}

export default LogoutButton;
