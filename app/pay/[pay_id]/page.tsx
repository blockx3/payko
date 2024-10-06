import prisma from "@/lib/db";

async function Pay({ params }: { params: { pay_id: string } }) {
  const payment_details = await prisma.payment_details.findUnique({
    where: {
      id: params.pay_id,
    },
  });
  return (
    <div>
      {payment_details?.payment_type
        ? payment_details?.payment_type
        : "incorrect id"}
    </div>
  );
}

export default Pay;
