import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NickName from "./NickName";
import { Bounce, ToastContainer } from "react-toastify";
import prisma from "@/lib/db";
import { CirclePlusIcon } from "lucide-react";
import AddWallet from "./AddWallet";
import DeleteWallet from "./DeleteWallet";

async function UserProfile() {
  const session = await auth();
  const dbUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      UserWallet: true,
    },
  });
  return (
    <div>
      <div className="px-6 py-2 flex gap-4 items-center border-b-2">
        <Avatar className="h-12 w-12 bg-[#333]">
          <AvatarImage src={session?.user?.image as string} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="text-2xl">
          <div className="">{session?.user?.name}</div>
          <NickName
            nickName={dbUser?.nickname as string}
            email={dbUser?.email as string}
          />
        </div>
      </div>
      <div className="m-1 p-1 max-w-2xl">
        <div className="text-xl mb-2 px-3 flex gap-2 justify-between items-center">
          <div>Wallets</div>
          <AddWallet email={dbUser?.email as string} />
        </div>
        <div className="border p-1  min-h-52 rounded-lg flex flex-col gap-2">
          {dbUser?.UserWallet.map((wallet) => {
            return (
              <div
                className="flex gap-3 justify-between rounded-lg bg-gray-100 py-2 px-4"
                key={wallet.publicKey}
              >
                <div className="">{wallet.walletname}</div>
                <div className="text-gray-600">{wallet.publicKey}</div>
                <DeleteWallet
                  email={dbUser.email as string}
                  walletId={wallet.id}
                  walletname={wallet.walletname as string}
                />
              </div>
            );
          })}
        </div>
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

export default UserProfile;
