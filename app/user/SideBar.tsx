"use client";
import {
  ArrowLeftRightIcon,
  CircleUserRoundIcon,
  CreditCard,
  WalletIcon,
  Cog,
  PackagePlus,
} from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion@sidebar";

function SideBar() {
  return (
    <div
      className="px-1 pt-2 bg-white w-48 xl:w-60 hidden lg:block border-r-2"
      style={{
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Link
        href="/user/profile"
        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
      >
        <CircleUserRoundIcon className="group-hover:opacity-100 opacity-50" />
        <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
      </Link>
      <Link
        href="/user/wallet/send"
        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
      >
        <WalletIcon className="group-hover:opacity-100 opacity-50" />
        <span className="flex-1 ms-3 whitespace-nowrap">Wallet</span>
      </Link>
      <Link
        href="/user/transaction/"
        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
      >
        <ArrowLeftRightIcon className="group-hover:opacity-100 opacity-50" />
        <span className="flex-1 ms-3 whitespace-nowrap">Transactions</span>
      </Link>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ">
            <div className="flex">
              <CreditCard />
              <span className="ms-3 whitespace-nowrap">Payment</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-6 ">
            <Link
              href="/user/payment/setup"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
            >
              <Cog className="group-hover:opacity-100 opacity-50" />
              <span className="flex-1 ms-3 whitespace-nowrap">List</span>
            </Link>
            <Link
              href="/user/payment/create"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
            >
              <PackagePlus className="group-hover:opacity-100 opacity-50" />
              <span className="flex-1 ms-3 whitespace-nowrap">Create</span>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SideBar;
