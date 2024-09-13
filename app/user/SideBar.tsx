"use client";
import {
  ArrowLeftRightIcon,
  CircleUserRoundIcon,
  WalletIcon,
} from "lucide-react";
import Link from "next/link";

function SideBar() {
  return (
    <div
      className="px-1 pt-2 bg-white w-48 xl:w-60 hidden lg:block"
      style={{
        height: "calc(100vh - 64px)",
      }}
    >
      <Link
        href="/user/profile"
        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
      >
        <CircleUserRoundIcon className="group-hover:opacity-100 opacity-50" />
        <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
      </Link>
      <Link
        href="/user/wallet/send"
        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
      >
        <WalletIcon className="group-hover:opacity-100 opacity-50" />
        <span className="flex-1 ms-3 whitespace-nowrap">Wallet</span>
      </Link>
      <Link
        href="/user/transaction/"
        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
      >
        <ArrowLeftRightIcon className="group-hover:opacity-100 opacity-50" />
        <span className="flex-1 ms-3 whitespace-nowrap">Transactions</span>
      </Link>
    </div>
  );
}

export default SideBar;
