import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";
import { $Enums } from "@prisma/client";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { pbkdf2Sync } from "pbkdf2";
import { SecretBoxLength } from "./constents";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUserWalletKeypair({
  email,
  chain,
  pin,
}: {
  email: string;
  chain: $Enums.Chain;
  pin: string;
}): Promise<Keypair | null> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      UserWallet: true,
    },
  });

  const walletAsPerChain = user?.UserWallet.filter(
    (wallet) => wallet.chain === chain,
  )[0];
  const secretKey = walletAsPerChain?.privateKey
    .split(",")
    .map((num) => parseInt(num)) as number[];

  const nonce = walletAsPerChain?.nonce_for_encryption
    ?.split(",")
    .map((num) => parseInt(num)) as number[];
  const getSalt = Buffer.from(
    walletAsPerChain?.salt_for_pin
      ?.split(",")
      .map((num) => parseInt(num)) as number[],
  );
  const key = pbkdf2Sync(pin, getSalt, 100000, SecretBoxLength.Key, "sha512");
  const decryptedPrivateKey = nacl.secretbox.open(
    Uint8Array.from(secretKey),
    Uint8Array.from(nonce),
    key,
  );
  if (!decryptedPrivateKey) {
    return null;
  }
  const UserWalletKeypair = Keypair.fromSecretKey(decryptedPrivateKey);
  return UserWalletKeypair;
}

export async function CreateTransaction({
  to,
  from,
  amount,
  chain,
  userId,
  transactionType,
  transactionSignature,
}: {
  to: string;
  from: string;
  amount: number;
  chain: $Enums.Chain;
  userId: string;
  transactionType: $Enums.transaction_type;
  transactionSignature: string;
}) {
  try {
    return await prisma.transactions.create({
      data: {
        transection_type: transactionType,
        transaction_signature: transactionSignature,
        to: to,
        from: from,
        chain: chain,
        amount: amount,
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getDBuser(email: string) {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}
