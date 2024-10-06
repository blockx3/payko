import { auth } from "@/auth";
import prisma from "@/lib/db";
import { PaymentCreateForm } from "./PaymentCreateForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function PaymentCreate() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      payment_category: true,
      UserWallet: true,
    },
  });

  return (
    <div className="p-2">
      {user?.payment_category.length === 0 ? (
        <div className="text-red-300 text-xl font-bold">
          Create A Payment Category First
          <Link href={"setup"}>
            <Button variant={"link"} className="text-xl">
              Here
            </Button>
          </Link>
        </div>
      ) : (
        <PaymentCreateForm
          payment_category={user?.payment_category!}
          UserWallet={user?.UserWallet!}
        />
      )}
    </div>
  );
}

export default PaymentCreate;
