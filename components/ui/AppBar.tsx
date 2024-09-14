"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";
import LogoutButton from "../LogoutButton";
import { CircleUserRoundIcon, WalletIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
export default function AppBar() {
  const user = useSession();
  const pathname = usePathname();
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6 border-b-2">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"https://static.aaraz.me/payko/logo.svg"}
            alt="Logo"
            className="w-20"
            height={1000} // Arbitrary height
            width={1000} // Arbitrary width
          />
        </Link>
      </div>
      <nav className="hidden text-base items-center gap-4 md:flex">
        <Link
          href="/"
          className="font-medium text-muted-foreground hover:text-foreground"
        >
          Home
        </Link>
        <Link
          href="/user/wallet"
          className="font-medium text-muted-foreground hover:text-foreground"
        >
          Wallet
        </Link>
        <Link
          href="https://github.com/blockx3/payko"
          target="_blank"
          className="font-medium text-muted-foreground hover:text-foreground"
        >
          GitHub
        </Link>
      </nav>
      <div className="flex gap-1">
        <div className="hidden xl:block">
          {!pathname.includes("profile") && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-10 w-10 bg-[#333]">
                    <AvatarImage src={user.data?.user?.image as string} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={"/user/profile"}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Place Holder</DropdownMenuItem>
                {/* <DropdownMenuItem> */}
                <LogoutButton />
                {/* </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid xl:gap-6 gap-2 text-lg py-2 font-medium">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Avatar className="h-10 w-10 bg-[#333]">
                    <AvatarImage src={user?.data?.user?.image as string} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <LogoutButton />
                </div>
                <div className="flex justify-between">
                  <SheetTrigger asChild>
                    <Link
                      href="/"
                      className="flex underline underline-offset-2 items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      Home
                    </Link>
                  </SheetTrigger>
                  <Link
                    href="#"
                    target="_blank"
                    className="flex underline underline-offset-2 items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
              <SheetTrigger asChild>
                <Link
                  href="/user/profile"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
                >
                  <CircleUserRoundIcon className="group-hover:opacity-100 opacity-50" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                </Link>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Link
                  href="/user/wallet/send"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group "
                >
                  <WalletIcon className="group-hover:opacity-100 opacity-50" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Wallet</span>
                </Link>
              </SheetTrigger>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
