"use client";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function PaymentDetailList({
  data,
  children,
}: {
  data: string[]; // sequence of strings are [title, category,wallet_name, payment_type]
  children: React.ReactNode;
}) {
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
      <div className="flex items-center">
        <Switch />
        (Unused)
      </div>
    </div>
  );
}

export default PaymentDetailList;
