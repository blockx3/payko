import { $Enums } from "@prisma/client";
import { getUserAvailableTokens } from "../UserInfo";
import Image from "next/image";
import { MotionDiv } from "@/lib/UseClientUIs";

async function UserAvailableToken({
  email,
  chain,
}: {
  email: string;
  chain: $Enums.Chain;
}) {
  const availableTokens = await getUserAvailableTokens({
    email: email,
    chain: chain,
  });
  return (
    <MotionDiv
      className="flex flex-col gap-2 mt-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.2,
        delay: 0,
        ease: [0, 0, 0, 0],
      }}
    >
      {availableTokens.map((token) => {
        return (
          <div
            key={token.symbol}
            className="flex justify-between items-center px-4 border border-b-stone-400 py-2"
          >
            <div className="flex items-center gap-2">
              <Image
                src={token.img}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <div>{token.symbol}</div>
            </div>
            <div>{token.balance}</div>
          </div>
        );
      })}
    </MotionDiv>
  );
}

export default UserAvailableToken;
