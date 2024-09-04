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
  console.log(email, chain, pin);
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      UserWallet: true,
    },
  });

  const walletAsPerChain = user?.UserWallet.filter(
    (wallet) => wallet.chain === chain
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
      .map((num) => parseInt(num)) as number[]
  );
  const key = pbkdf2Sync(pin, getSalt, 100000, SecretBoxLength.Key, "sha512");
  const decryptedPrivateKey = nacl.secretbox.open(
    Uint8Array.from(secretKey),
    Uint8Array.from(nonce),
    key
  );
  if (!decryptedPrivateKey) {
    return null;
  }
  const UserWalletKeypair = Keypair.fromSecretKey(decryptedPrivateKey);
  return UserWalletKeypair;
}
