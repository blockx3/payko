"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { SendCrypto } from "@/app/actions/database";

function SendForm() {
  const [receiverData, setReceiverData] = useState({
    walletAddr: "",
    amount: "",
  });
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function HandleSubmit() {
    setError("");
    setLoading(true);
    if (isNaN(parseFloat(receiverData.amount))) {
      setError("Amount is not valid");
      setLoading(false);
      return;
    }
    const res = await SendCrypto({
      chain: "SOLANA",
      amount: parseFloat(receiverData.amount),
      to: receiverData.walletAddr,
      transationPin: pin,
    });
    if (res.success) {
      setError("Transaction Successful: Reload to see");
      setLoading(false);
      setPin("");
      return;
    }
    setError(res.message);
    setLoading(false);
    return;
  }
  return (
    <>
      <form className="flex flex-col gap-4 ">
        <div>
          <label htmlFor="WalletAddr">Wallet Address</label>
          <Input
            id="WalletAddr"
            onChange={(e) => {
              setError("");
              setReceiverData({ ...receiverData, walletAddr: e.target.value });
            }}
            value={receiverData.walletAddr}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount in SOL</label>
          <Input
            id="amount"
            onChange={(e) => {
              setError("");
              setReceiverData({
                ...receiverData,
                amount: e.target.value,
              });
            }}
            value={receiverData.amount}
            type="text"
          />
        </div>
        <AlertDialog>
          <AlertDialogTrigger
            disabled={
              receiverData.amount == "" || receiverData.walletAddr == ""
            }
            className="h-10 px-4 py-2 bg-slate-200 text-black hover:bg-slate-300 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Send
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="flex flex-row items-center justify-between">
              <AlertDialogTitle>Enter Your Transaction PIN</AlertDialogTitle>
              <AlertDialogCancel>
                <X />
              </AlertDialogCancel>
            </AlertDialogHeader>
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
      </form>
    </>
  );
}

export default SendForm;
