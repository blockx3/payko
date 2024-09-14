import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDBuser } from "@/lib/utils";
import NickName from "./NickName";
import { Bounce, ToastContainer } from "react-toastify";

async function UserProfile() {
  const session = await auth();
  const dbUser = await getDBuser(session?.user?.email as string);
  return (
    <div>
      <div className="px-6 py-2 flex gap-4 items-center">
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
