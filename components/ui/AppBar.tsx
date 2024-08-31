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
import { auth } from "@/auth";

export default async function AppBar() {
  const user = await auth();
  return (
    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <PowerIcon className="h-6 w-6" />
          <span className="text-lg font-bold hidden sm:block">Logo</span>
        </Link>
      </div>
      <nav className="hidden items-center gap-4 md:flex">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Home
        </Link>
        <Link
          href="/user/wallet"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Wallet
        </Link>
        <Link
          href="https://github.com/blockx3/payko"
          target="_blank"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          GitHub
        </Link>
      </nav>
      <div className="flex gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-10 w-10 bg-[#333]">
                <AvatarImage src={user?.user?.image as string} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Place Holder</DropdownMenuItem>
            <DropdownMenuItem>Place Holder</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <PowerIcon className="h-6 w-6" />
                <span className="text-lg font-bold">LOGO</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/user/wallet"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                Wallet
              </Link>
              <Link
                href="#"
                target="_blank"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                GitHub
              </Link>
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

function PowerIcon(props: any) {
  return (
    <svg
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
      <path d="M12 2v10" />
      <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
    </svg>
  );
}
