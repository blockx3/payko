import prisma from "@/lib/db";

export default async function PayPage({
  params,
}: {
  params: { pay_id: string };
}) {
  const payment_details = await prisma.payment_details.findUnique({
    where: {
      id: params.pay_id,
    },
  });
  if (!payment_details) {
    return <div>incorrect id</div>;
  }
  return <div>payment ui</div>;
}
