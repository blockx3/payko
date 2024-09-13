import prisma from "@/lib/db";
import SideBar from "./SideBar";
import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";
import AppBar from "@/components/ui/AppBar";

async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userDB = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  if (!userDB?.initalized) {
    redirect("/welcome/init/", RedirectType.replace);
  }
  return (
    <>
      <AppBar />
      <div
        className="flex bg-slate-100"
        style={{
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <SideBar />
        <div className="flex-1 bg-white">{children}</div>
      </div>
    </>
  );
}

export default UserLayout;
