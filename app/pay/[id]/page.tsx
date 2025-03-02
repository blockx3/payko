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

  const paymentDetails = await prisma.payment_details.findUnique({
    where: {
      id: params.id,
    },
    include: {
      UserWallet: true,
    },
  });

  if (!paymentDetails) return <>Payment doesnot exist</>;
  const paymentDetail = {
    id: paymentDetails.id,
    payment_type: paymentDetails.payment_type,
    amount_type: paymentDetails.amount_type,
    amount: paymentDetails.amount,
    icon: paymentDetails.icon,
    title: paymentDetails.title,
    description: paymentDetails.description,
    redirectUrl: paymentDetails.redirectUrl,
    webhookUrl: paymentDetails.webhookUrl,
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Pay
          paymentDetails={paymentDetail}
          supportedTokens={supportedTokens}
          MerchantWallet={paymentDetails.UserWallet.publicKey}
        />
      </div>
    </div>
  );
}
