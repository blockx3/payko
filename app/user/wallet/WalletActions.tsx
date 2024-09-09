"use client";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Bounce, toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

function WalletActions({ publickey }: { publickey: string }) {
  return (
    <div className="flex xl:gap-10 gap-5 py-2">
      <Link
        href="send"
        className="py-1 px-6 bg-sky-400 hover:bg-sky-400/80 text-white rounded-lg hover:shadow-lg shadow-md shadow-sky-200"
      >
        Send
      </Link>
      <Link
        href="withdraw"
        className="py-1 px-6 bg-sky-400 hover:bg-sky-400/80 text-white rounded-lg hover:shadow-lg shadow-md shadow-sky-200"
      >
        Withdraw
      </Link>
      <Link
        href="swap"
        className="py-1 px-6 bg-sky-400 hover:bg-sky-400/80 text-white rounded-lg hover:shadow-lg shadow-md shadow-sky-200"
      >
        Swap
      </Link>
      <AlertDialog>
        <AlertDialogTrigger className="bg-slate-200 rounded-lg py-1 px-6 hover:bg-slate-300/80 shadow-lg">
          Wallet Address
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex flex-row items-center justify-between">
            <AlertDialogTitle>Public Key</AlertDialogTitle>
            <AlertDialogCancel>
              <X />
            </AlertDialogCancel>
          </AlertDialogHeader>
          <Input
            type="text"
            value={publickey}
            disabled
            className="cursor-auto"
          />
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(publickey);
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
              Copy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default WalletActions;
