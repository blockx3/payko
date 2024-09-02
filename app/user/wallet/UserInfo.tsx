import prisma from "@/lib/db";
import { conn } from "@/lib/solana";
import { $Enums } from "@prisma/client";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
export async function UserTotalBalance({
  email,
  chain,
}: {
  email: string;
  chain: $Enums.Chain;
}) {
  const UserDB = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      UserWallet: true,
    },
  });
  const UserPubKey = new PublicKey(
    UserDB?.UserWallet.filter((d) => d.chain === chain)[0].publicKey as string
  );
  const Supported_tokens = (await prisma.supportedTokens.findMany()).filter(
    (d) => d.chain === chain
  );

  // Need to update the price fetching logic once we add more tokens
  const tokenPriceData: {
    data: {
      SOL: {
        price: number;
        mintSymbol: string;
      };
      USDC: {
        price: number;
        mintSymbol: string;
      };
      USDT: {
        price: number;
        mintSymbol: string;
      };
    };
  } = await fetch("https://price.jup.ag/v6/price?ids=SOL,USDC,USDT").then((d) =>
    d.json()
  );

  const total_balance_promisses = Supported_tokens.map(async (token_detail) => {
    let balance = await getAssociateTokenBalance({
      mint: token_detail.token_mint,
      pubkey: UserPubKey,
    });
    balance =
      balance /
      (token_detail.token_mint === "NATIVE"
        ? LAMPORTS_PER_SOL
        : 10 ** token_detail.decimal);
    // @ts-ignore
    const price = balance * tokenPriceData.data[token_detail.symbol]?.price;
    return price;
  });

  const total_balance = (await Promise.all(total_balance_promisses)).reduce(
    (a, b) => a + b,
    0
  );
  return (
    <div className="text-4xl">
      ${total_balance.toFixed(2)} <span className="text-lg">USD</span>
    </div>
  );
}

async function getAssociateTokenBalance({
  mint,
  pubkey,
}: {
  mint: string;
  pubkey: PublicKey;
}) {
  if (mint === "NATIVE") {
    const balance = await conn.getBalance(new PublicKey(pubkey));
    return balance;
  }
  try {
    const ata = await getAssociatedTokenAddress(new PublicKey(mint), pubkey);
    const account = await getAccount(conn, ata);
    return Number(account.amount);
  } catch (error) {
    // console.log(error);
    return 0;
  }
}
