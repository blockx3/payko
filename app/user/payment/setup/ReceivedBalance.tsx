import { auth } from "@/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import prisma from "@/lib/db";

async function ReceivedBalance({
  payment_detail_id,
}: {
  payment_detail_id: string;
}) {
  const data = await prisma.received_payments.findMany({
    where: {
      payment_detail_id: payment_detail_id,
    },
  });
  const received = data.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="text-start max-w-40 text-ellipsis overflow-hidden text-nowrap">
          {received}
        </TooltipTrigger>
        <TooltipContent>
          <p>{received}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ReceivedBalance;
