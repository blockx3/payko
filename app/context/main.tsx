"use client";
import { SessionProvider } from "next-auth/react";
import WalletContext from "./WalletContext";

function AllContextsProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WalletContext>{children}</WalletContext>
    </SessionProvider>
  );
}

export default AllContextsProvider;
