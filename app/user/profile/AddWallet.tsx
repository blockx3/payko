"use client";

import { CirclePlusIcon, Loader2, X } from "lucide-react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddUserWallet } from "@/app/actions/database";
import { $Enums } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function AddWallet({ email }: { email: string }) {
  const [pin, setPin] = useState("");
  const [walletname, setWalletname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function HandleSubmit() {
    if (walletname.length < 1) {
      setError("Wallet Name is required");
      return;
    }
    setError("");
    setLoading(true);
    const res = await AddUserWallet({
      chain: $Enums.Chain.SOLANA,
      email: email,
      pin: pin,
      walletname: walletname,
    });
    if (res.success) {
      setError("Wallet Creation Successful");
      setLoading(false);
      setPin("");
      setWalletname("");
      router.refresh();
      return;
    }
    setError(res.message);
    setLoading(false);
    return;
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex items-center gap-1 opacity-50 hover:opacity-100">
          Add New
          <CirclePlusIcon />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>
            Enter Transaction PIN for new wallet
          </AlertDialogTitle>
          <AlertDialogCancel>
            <X />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div>
          Wallet Name
          <Input onChange={(e) => setWalletname(e.target.value)} />
        </div>
        <div className="mx-auto">
          <InputOTP maxLength={6} onChange={(value) => setPin(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && <div className="text-sm text-wrap">{error}</div>}
        <AlertDialogFooter>
          {loading ? (
            <Button disabled className="space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <div>Please wait</div>
            </Button>
          ) : (
            <Button disabled={pin.length !== 6} onClick={HandleSubmit}>
              Send
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddWallet;
