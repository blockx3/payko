"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { $Enums, transactions } from "@prisma/client";
import { Bounce, toast } from "react-toastify";

function TransactionTable({ transactions }: { transactions: transactions[] }) {
  return (
    <Table className="text-base text-gray-700">
      <TableCaption>A list of your recent Transection.</TableCaption>
      <TableHeader className="bg-slate-200">
        <TableRow className="">
          <TableHead className="pl-2">Type</TableHead>
          <TableHead className="pl-2">From</TableHead>
          <TableHead className="pl-2">TO</TableHead>
          <TableHead className="pl-2">Amount</TableHead>
          <TableHead className="pl-2">Signature</TableHead>
        </TableRow>
      </TableHeader>
      {/* TODO: make the transections scrollable */}
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx.id}>
            <TableCell className="lg:max-w-16">
              <Badge
                variant={`${
                  tx.transection_type === $Enums.transaction_type.NATIVECOIN
                    ? "NATIVE"
                    : "default"
                }`}
              >
                {tx.transection_type}
              </Badge>
            </TableCell>
            <TableCell
              className="text-ellipsis overflow-hidden max-w-40 cursor-pointer hover:bg-slate-100 "
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(tx.from);
                toast.success("Address Copied !!", {
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
              }}
            >
              {tx.from}
            </TableCell>
            <TableCell
              className="text-ellipsis overflow-hidden max-w-40 cursor-pointer hover:bg-slate-100"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(tx.from);
                toast.success("Address Copied !!", {
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
              }}
            >
              {tx.to}
            </TableCell>
            <TableCell className="text-green-600">{tx.amount}</TableCell>
            <TableCell
              className="text-ellipsis overflow-hidden max-w-40 cursor-pointer hover:bg-slate-100"
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(tx.from);
                toast.success("Address Copied !!", {
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
              }}
            >
              {tx.transaction_signature}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TransactionTable;
