"use client";
import { TogglePaymentLink } from "@/app/actions/database";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import DeletePaymentDetailsBtn from "./DeletePaymentDetails";
import CopyBtn from "@/components/CopyBtn";

function PaymentDetailList({
  data,
  children,
  active,
  payment_detail_id,
}: {
  data: string[]; // sequence of strings are [title, category,wallet_name, payment_type]
  children: React.ReactNode;
  active: boolean;
  payment_detail_id: string;
}) {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  return (
    <div className="grid grid-cols-6 rounded-lg bg-gray-100 py-2 px-4">
      {data.map((item, index) => (
        <TooltipProvider key={index} delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="text-start max-w-40 text-ellipsis overflow-hidden text-nowrap">
              {item}
            </TooltipTrigger>
            <TooltipContent>
              <p>{item}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      {children}
      <div className="flex items-center gap-4">
        <DeletePaymentDetailsBtn
          email={session.data?.user?.email as string}
          PaymentDetailId={payment_detail_id}
        />
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <Switch
              checked={active}
              onCheckedChange={async (e) => {
                setLoading(true);
                const res = await TogglePaymentLink({
                  state: e,
                  email: session.data?.user?.email as string,
                  payment_detail_id: payment_detail_id,
                });
                if (!res.success) {
                  alert(res.message);
                  setLoading(false);
                  return;
                }
                if (e) {
                  toast.success(
                    `${e ? "Toggled active" : "Toggled disabled"}`,
                    {
                      position: "bottom-right",
                      autoClose: 1000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    },
                  );
                  setLoading(false);
                  return;
                }
                toast.warn(`${e ? "Toggled active" : "Toggled disabled"}`, {
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
                setLoading(false);
              }}
            />
          </>
        )}
        <CopyBtn text={`/pay/${payment_detail_id}`} />
      </div>
    </div>
  );
}

export default PaymentDetailList;
