import { auth } from "@/auth";
import WalletActions from "./WalletActions";
import { UserTotalBalance } from "./UserInfo";
import { Suspense } from "react";
import prisma from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function UserLayout({ children }: { children: React.ReactNode }) {
  const user = await auth();
  const userDB = await prisma.user.findUnique({
    where: {
      email: user?.user?.email as string,
    },
    include: {
      UserWallet: true,
    },
  });
  return (
    <div
      className="flex xl:items-center"
      style={{
        height: "calc(100vh - 64px)",
      }}
    >
      <div className="max-w-3xl lg:max-w-5xl bg-white xl:shadow-xl w-full mx-auto h-[600px] xl:h-[800px] xl:rounded-lg xl:py-3 py-1 xl:px-8 px-2">
        <div>
          <div className="flex gap-2 items-center">
            <Avatar className="xl:w-14 w-10 xl:h-14 h-10">
              <AvatarImage
                src={user?.user?.image as string}
                className="rounded-full"
              />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <h1 className="xl:text-4xl text-xl text-slate-600 font-bold">
              {user?.user?.name}
            </h1>
          </div>
          <div className="mt-4">
            <div className="text-lg">Total Balance</div>
            <Suspense
              fallback={
                <div className="flex flex-row gap-2 items-center h-10">
                  <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
                  <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:.3s]"></div>
                  <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:.7s]"></div>
                </div>
              }
            >
              <UserTotalBalance
                email={user?.user?.email as string}
                chain="SOLANA"
              />
            </Suspense>
          </div>
          <WalletActions
            publickey={userDB?.UserWallet[0]?.publicKey as string}
          />
          <div className="border-b-2 border-slate-300 rounded-full xl:my-3 my-2" />
        </div>
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
}

export default UserLayout;
