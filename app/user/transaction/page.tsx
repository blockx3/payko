export const dynamic = "force-dynamic";
import prisma from "@/lib/db";
import TransactionTable from "./TransactionTable";
import { Bounce, ToastContainer } from "react-toastify";

export default async function Component() {
  const transactions = await prisma.transactions.findMany();
  return (
    <div className="">
      <div className="max-w-[100vw] overflow-auto">
        {transactions.length === 0 ? (
          <div className="font-bold text-2xl">No Transactions</div>
        ) : (
          <TransactionTable transactions={transactions} />
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
