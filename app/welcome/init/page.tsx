import { auth } from "@/auth";
import prisma from "@/lib/db";
import { AnimatedText } from "@/components/ui/AnimatedText";
import CreatePinForm, { AlreadyCreadted } from "./CreatePinForm";

async function WelcomeInit() {
  const session = await auth();
  const userDB = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      UserWallet: true,
    },
  });

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="rounded-lg p-2 shadow-2xl h-[500px] w-[700px] ">
        <div className="flex flex-col items-center">
          <AnimatedText text="Welcome ✨" type="calmInUp" />
        </div>
        {userDB?.initalized ? <AlreadyCreadted /> : <CreatePinForm />}
      </div>
    </div>
  );
}

export default WelcomeInit;
