"use client";
import { Bounce, toast } from "react-toastify";
import DeleteWallet from "./DeleteWallet";
import { UserWallet } from "@prisma/client";
function WalletList({
  wallet,
  email,
}: {
  wallet: UserWallet[];
  email: string;
}) {
  return wallet.map((wallet) => {
    return (
      <div
        className="flex gap-3 justify-between rounded-lg bg-gray-100 py-2 px-4"
        key={wallet.publicKey}
      >
        <div className="">{wallet.walletname}</div>
        <div
          className="text-gray-600 cursor-pointer px-1 rounded-md hover:bg-slate-200"
          onClick={() => {
            navigator.clipboard.writeText(wallet.publicKey);
            toast.success("Address Copied !!", {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }}
        >
          {wallet.publicKey}
        </div>
        <DeleteWallet
          email={email as string}
          walletId={wallet.id}
          walletname={wallet.walletname as string}
        />
      </div>
    );
  });
}

export default WalletList;
