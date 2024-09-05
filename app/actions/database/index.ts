"use server";
/*

IMPORTANT: 
This file contains Nextjs Actions function 
which exposes POST endpoint in the APP
any exported async function is a POST endpoint
so while writing any more action function remember 
to check auth() before executing any action

This is the function to check auth()
write it at very first lines of function starting

const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

*/

import nacl from "tweetnacl";
import { pbkdf2Sync } from "pbkdf2";
import { $Enums } from "@prisma/client";
import { Keypair } from "@solana/web3.js";
import prisma from "@/lib/db";
import { SecretBoxLength } from "@/lib/constents";
import { auth } from "@/auth";

export async function CreateUserWallet({
  pin,
  email,
  chain,
}: {
  pin: string;
  email: string;
  chain: $Enums.Chain;
}) {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    const userDB = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        UserWallet: true,
      },
    });
    if (userDB?.UserWallet.length != 0) {
      return {
        success: false,
        message: "Wallet already created",
      };
    }
    const keypair = Keypair.generate();
    const getSalt = nacl.randomBytes(16);
    const key = pbkdf2Sync(pin, getSalt, 100000, SecretBoxLength.Key, "sha512");
    const nonce = nacl.randomBytes(SecretBoxLength.Nonce);
    const messageUint8 = keypair.secretKey.buffer;
    const encryptedPrivateKey = nacl.secretbox(
      Buffer.from(messageUint8),
      nonce,
      key
    );
    await prisma.$transaction([
      prisma.userWallet.create({
        data: {
          userId: userDB?.id as string,
          chain: chain,
          publicKey: keypair.publicKey.toString(),
          privateKey: encryptedPrivateKey.toString(),
          salt_for_pin: getSalt.toString(),
          nonce_for_encryption: nonce.toString(),
        },
      }),
      prisma.user.update({
        where: {
          email: email,
        },
        data: {
          initalized: true,
        },
      }),
    ]);

    return {
      success: true,
      message: "Wallet created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error creating wallet",
    };
  }
}
