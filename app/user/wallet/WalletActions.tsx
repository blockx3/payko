"use client";
import Link from "next/link";
function WalletActions() {
  return (
    <div className="flex xl:gap-10 gap-5 py-2">
      <Link
        href="send"
        className="py-1 px-6 bg-sky-400 text-white rounded-lg hover:shadow-lg"
      >
        Send
      </Link>
      <Link
        href="withdraw"
        className="py-1 px-6 bg-sky-400 text-white rounded-lg hover:shadow-lg"
      >
        Withdraw
      </Link>
      <Link
        href="swap"
        className="py-1 px-6 bg-sky-400 text-white rounded-lg hover:shadow-lg"
      >
        Swap
      </Link>
    </div>
  );
}

export default WalletActions;
