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
        token_mint: "NATIVE",
        imageUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=033",
      },
      {
        chain: "SOLANA",
        name: "USDC",
        symbol: "USDC",
        decimal: 6,
        token_mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        imageUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=033",
      },
      {
        chain: "SOLANA",
        name: "USDT",
        symbol: "USDT",
        decimal: 6,
        token_mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        imageUrl: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=033",
      },
    ],
  });
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
