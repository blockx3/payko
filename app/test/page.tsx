"use client";
import WalletButton from "@/components/WalletConnectButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  SystemProgram,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { SendSignedTransactionToBlockchain } from "../actions/web3";

function Test() {
  const { connection } = useConnection();
  const { signTransaction, publicKey } = useWallet();
  async function doo() {
    if (!signTransaction || !publicKey) {
      return;
    }
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey as PublicKey,
        toPubkey: new PublicKey("AzTdY5rBmvMeffYTrDRsvFYFnz7YvDnR4ERWpFT2mmo8"),
        lamports: 0.005 * LAMPORTS_PER_SOL, // Convert SOL to lamports
      }),
    );
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;
    const signedTransaction = await signTransaction(transaction);
    console.log(signedTransaction.serialize().toString("base64"));
    const sign = await SendSignedTransactionToBlockchain({
      signedTransactionBase64: signedTransaction.serialize().toString("base64"),
    });
    console.log(sign);
  }
  return (
    <div>
      <WalletButton />
      <button onClick={doo}>Send</button>
    </div>
  );
}

export default Test;
