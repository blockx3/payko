import { Connection } from "@solana/web3.js";

export const conn = new Connection(
  `https://devnet.helius-rpc.com/?api-key=${process.env.RPC_URL_KEY}`,
);
