import { auth } from "@/auth";
import SendForm from "./SendForm";
import UserAvailableToken from "./UserTokensList";
import { Suspense } from "react";
import { ToastContainer, Bounce } from "react-toastify";
async function WalletSend() {
  const user = await auth();
  return (
    <>
      <SendForm />
      <div className="overflow-auto max-h-96">
        <Suspense
          fallback={
            <div className="flex flex-col ">
              <div className="flex w-full animate-pulse gap-2 px-4 py-1">
                <div className="h-10 w-10 rounded-full bg-slate-400"></div>
                <div className="flex-1 flex items-center justify-between">
                  <div className="mb-1 h-5 w-10 rounded-lg bg-slate-400 text-lg"></div>
                  <div className="mb-1 h-5 w-8 rounded-lg bg-slate-400 text-lg"></div>
                </div>
              </div>
              <div className="flex w-full animate-pulse gap-2 px-4 py-1">
                <div className="h-10 w-10 rounded-full bg-slate-400"></div>
                <div className="flex-1 flex items-center justify-between">
                  <div className="mb-1 h-5 w-10 rounded-lg bg-slate-400 text-lg"></div>
                  <div className="mb-1 h-5 w-8 rounded-lg bg-slate-400 text-lg"></div>
                </div>
              </div>
              <div className="flex w-full animate-pulse gap-2 px-4 py-1">
                <div className="h-10 w-10 rounded-full bg-slate-400"></div>
                <div className="flex-1 flex items-center justify-between">
                  <div className="mb-1 h-5 w-10 rounded-lg bg-slate-400 text-lg"></div>
                  <div className="mb-1 h-5 w-8 rounded-lg bg-slate-400 text-lg"></div>
                </div>
              </div>
            </div>
          }
        >
          <UserAvailableToken
            email={user?.user?.email as string}
            chain="SOLANA"
          />
        </Suspense>
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
    </>
  );
}

export default WalletSend;
