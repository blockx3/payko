import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";
import { $Enums } from "@prisma/client";
import { Keypair } from "@solana/web3.js";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserWalletKeypair({
  email,
  chain,
}: {
  email: string;
  chain: $Enums.Chain;
}): Promise<Keypair> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      UserWallet: true,
    },
  });
  const secretKey = user?.UserWallet.filter(
    (wallet) => wallet.chain === chain
  )[0]
    .privateKey.split(",")
    .map((num) => parseInt(num));
  const UserWalletKeypair = Keypair.fromSecretKey(
    Uint8Array.from(secretKey as number[])
  );
  return UserWalletKeypair;
}
