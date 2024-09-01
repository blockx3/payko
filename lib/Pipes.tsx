import { auth } from "@/auth";
import prisma from "./db";
import { Keypair } from "@solana/web3.js";

export async function UserWalletCheckPipe({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userDB = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      UserWallet: true,
    },
  });
  if (userDB?.UserWallet.length === 0) {
    const keypair = Keypair.generate();
    await prisma.userWallet.create({
      data: {
        userId: userDB?.id as string,
        chain: "SOLANA",
        publicKey: keypair.publicKey.toString(),
        privateKey: keypair.secretKey.toString(),
      },
    });
  }
  return <>{children}</>;
}
