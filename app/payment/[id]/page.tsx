import { getUserAvailableTokens } from "@/app/user/wallet/UserInfo";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import Pay from "./Pay";
export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await auth();

  const supportedTokens = await prisma.supportedTokens.findMany({
    select: {
      id: true,
      token_mint: true,
      symbol: true,
      name: true,
      imageUrl: true,
    },
  });

  console.log("supportedTokens", supportedTokens);
  const paymentDetails = await prisma.payment_details.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      payment_type: true,
      amount_type: true,
      amount: true,
      icon: true,
      title: true,
      description: true,
      redirectUrl: true,
      webhookUrl: true,
    },
  });
  console.log("paymentDetails", paymentDetails);

  if (!paymentDetails) return <>Payment doesnot exist</>;

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Pay
          paymentDetails={paymentDetails}
          supportedTokens={supportedTokens}
        />
      </div>
    </div>
  );
}
