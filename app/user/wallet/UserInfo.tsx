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
    UserDB?.UserWallet.filter((d) => d.chain === chain)[0]?.publicKey as string,
  );
  const Supported_tokens = (await prisma.supportedTokens.findMany()).filter(
    (d) => d.chain === chain,
  );

  const QueryURL = Supported_tokens.map((d) => d.token_mint).join(",");
  const tokenPriceData = await fetch(
    `https://api.jup.ag/price/v2?ids=${QueryURL}`,
    { cache: "no-store" },
  ).then((d) => d.json());

  const total_balance_promisses = Supported_tokens.map(async (token_detail) => {
    let balance = await getAssociateTokenBalance({
      mint: token_detail.token_mint,
      pubkey: UserPubKey,
    });
    balance =
      balance /
      (token_detail.token_mint === "So11111111111111111111111111111111111111112"
        ? LAMPORTS_PER_SOL
        : 10 ** token_detail.decimal);
    // @ts-ignore

    const price = balance * tokenPriceData.data[token_detail.token_mint]?.price;
    return price;
  });

  const total_balance = (await Promise.all(total_balance_promisses)).reduce(
    (a, b) => a + b,
    0,
  );
  return (
    <div className="xl:text-4xl text-2xl">
      ${total_balance.toFixed(2)} <span className="text-base">USD</span>
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
  try {
    if (mint === "So11111111111111111111111111111111111111112") {
      const balance = await conn.getBalance(new PublicKey(pubkey));
      return balance;
    }
    const ata = await getAssociatedTokenAddress(new PublicKey(mint), pubkey);
    const account = await getAccount(conn, ata);
    return Number(account.amount);
  } catch (error) {
    // console.log(error); // only uncomment in development stage
    return 0;
  }
}

export async function getUserAvailableTokens({
  email,
  chain,
}: {
  email: string;
  chain: $Enums.Chain;
}) {
  if (email == undefined) {
    return [];
  }
  const UserDB = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      UserWallet: true,
    },
  });
  const UserPubKey = new PublicKey(
    UserDB?.UserWallet.filter((d) => d.chain === chain)[0]?.publicKey as string,
  );
  const Supported_tokens = (await prisma.supportedTokens.findMany()).filter(
    (d) => d.chain === chain,
  );
  const AvailableTokenDetails = Supported_tokens.map(async (token_detail) => {
    let balance = await getAssociateTokenBalance({
      mint: token_detail.token_mint,
      pubkey: UserPubKey,
    });
    balance =
      balance /
      (token_detail.token_mint === "So11111111111111111111111111111111111111112"
        ? LAMPORTS_PER_SOL
        : 10 ** token_detail.decimal);
    return {
      balance: balance,
      symbol: token_detail.symbol,
      img: token_detail.imageUrl as string,
    };
  });
  return await Promise.all(AvailableTokenDetails);
}
