import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SendForm() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <label htmlFor="WalletAddr">Wallet Address</label>
        <Input id="WalletAddr" />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <Input id="amount" />
      </div>
      <Button
        type="submit"
        variant={"outline"}
        className="bg-slate-200 font-bold text-xl"
      >
        Send
      </Button>
    </form>
  );
}

export default SendForm;
