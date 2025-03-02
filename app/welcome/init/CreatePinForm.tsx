"use client";
import { CreateUserWallet } from "@/app/actions/database";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CreatePinForm() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const session = useSession();
  const [loading, setLoading] = useState(false);
  async function HandleSubmit() {
    setLoading(true);
    const res = await CreateUserWallet({
      pin: pin,
      chain: "SOLANA",
      email: session.data?.user?.email as string,
    });
    router.push("/user/wallet/send");
  }

  return (
    <div className="space-y-10 px-10">
      <div className="text-xl">Lets create a wallet for you.</div>
      <div className="space-y-6">
        <div className="text-xl">Enter a 6 digit PIN for your wallet</div>
        <div>
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
        {loading ? (
          <Button disabled className="space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <div>Please wait</div>
          </Button>
        ) : (
          <Button disabled={pin.length !== 6} onClick={HandleSubmit}>
            Create Wallet
          </Button>
        )}
      </div>
    </div>
  );
}

export function AlreadyCreadted() {
  return (
    <div className="text-2xl text-center font-bold flex flex-col gap-6 mt-16">
      <Link href={"/user/wallet/send"}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div>You have already created a wallet</div>
          <Button>Go To Wallet</Button>
        </motion.div>
      </Link>
    </div>
  );
}

export default CreatePinForm;
