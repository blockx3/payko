import { Connection } from "@solana/web3.js";

export const conn = new Connection(
  `https://${
    process.env.RPC_NET === "mainnet" ? "mainnet" : "devnet"
  }.helius-rpc.com/?api-key=${process.env.RPC_URL_KEY}`,
);
