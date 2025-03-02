"use server";

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
  const transaction = Transaction.from(
    Buffer.from(signedTransactionBase64, "base64"),
  );
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  // const sign = await sendAndConfirmTransaction(connection, transaction, []);
  const sign = await connection.sendRawTransaction(transaction.serialize());
  return {
    success: true,
    message: "success",
    data: sign,
  };
}
