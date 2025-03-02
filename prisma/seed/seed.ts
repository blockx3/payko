import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // SOLANA tokens
  await prisma.supportedTokens.createMany({
    data: [
      {
        chain: "SOLANA",
        name: "SOL",
        symbol: "SOL",
        decimal: 0,
        token_mint: "So11111111111111111111111111111111111111112",
        imageUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=033",
      },
      // {
      //   chain: "SOLANA",
      //   name: "USDC",
      //   symbol: "USDC",
      //   decimal: 6,
      //   token_mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      //   imageUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=033",
      // },
      // {
      //   chain: "SOLANA",
      //   name: "USDT",
      //   symbol: "USDT",
      //   decimal: 6,
      //   token_mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
      //   imageUrl: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=033",
      // },
    ],
  });

  // fake transections , before using these change the userId with a currect user
  // await prisma.transactions.createMany({
  //   data: [
  //     {
  //       userId: "cm7rbxxgj0000ilcjj9fcgfel",
  //       amount: 100,
  //       chain: "SOLANA",
  //       transection_type: "NATIVECOIN",
  //       transaction_signature:
  //         "sdsskjdfsdf7sf87sdf8syfbsufysd87fdssdo8f7sd9f89dv8d98d9f79sfsdd",
  //       from: "sdsskjdfsdf7sf87sdf8syfbsufysd87fdssdo8f7sd9f89dv8d98d9f79sfsdd",
  //       to: "sdsskjdfsdf7sf87sdf8syfbsufysd87fdssdo8f7sd9f89dv8d98d9f79sfsdd",
  //     },
  //   ],
  // });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
