"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { clusterApiUrl, Connection, Transaction } from "@solana/web3.js";

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

export async function SendSignedTransactionToBlockchain({
  signedTransactionBase64,
}: {
  signedTransactionBase64: string;
}): Promise<{
  success: boolean;
  message: string;
  data: any;
}> {
  try {
    const session = await auth();
    const transaction = Transaction.from(
      Buffer.from(signedTransactionBase64, "base64"),
    );
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // const sign = await sendAndConfirmTransaction(connection, transaction, []);
    const sign = await connection.sendRawTransaction(transaction.serialize());
    await prisma.transactions.create({
      data: {
        user: {
          connect: {
            email: session?.user?.email as string,
          },
        },
        amount: 0,
        transection_type: "NATIVECOIN",
        transaction_signature: sign,
        to: "sdsdsd",
        from: "sdsds",
        chain: "SOLANA",
      },
    });
    return {
      success: true,
      message: "success",
      data: sign,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "failed",
      data: "",
    };
  }
}
