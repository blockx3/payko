import { auth } from "@/auth";
import { AvatarFallback, AvatarImage, Avatar } from "@radix-ui/react-avatar";
import WalletActions from "./WalletActions";
import { UserWalletCheckPipe } from "@/lib/Pipes";

async function UserLayout({ children }: { children: React.ReactNode }) {
  const user = await auth();
  return (
    <UserWalletCheckPipe>
      <div
        className="flex bg-slate-100 items-center"
        style={{
          height: "calc(100vh - 64px)",
        }}
      >
        <div className="max-w-3xl lg:max-w-5xl bg-white shadow-xl w-full mx-auto h-[80vh] rounded-lg py-3 px-8">
          <div className="flex gap-2 items-center">
            <Avatar className="w-14 h-14">
              <AvatarImage
                src={user?.user?.image as string}
                className="rounded-full"
              />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl text-slate-600 font-bold">
              {user?.user?.name}
            </h1>
          </div>
          <div className="mt-4">
            <div className="text-lg">Total Balance</div>
            <div className="text-4xl ">
              ${250} <span className="text-lg">USD</span>
            </div>
          </div>
          <WalletActions />
          <div className="border-b-2 border-slate-500 rounded-full my-3" />
          <div>{children}</div>
        </div>
      </div>
    </UserWalletCheckPipe>
  );
}

export default UserLayout;
