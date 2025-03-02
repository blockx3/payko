"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { $Enums } from "@prisma/client";
import WalletButton from "@/components/WalletConnectButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  SystemProgram,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { SendSignedTransactionToBlockchain } from "@/app/actions/web3";
import { useRouter } from "next/navigation";

export interface IPaymentDetails {
  id: string;
  payment_type: $Enums.payment_type;
  amount_type: $Enums.amount_type;
  amount: number | null;
  icon: string | null;
  title: string;
  description: string | null;
  redirectUrl: string | null;
  webhookUrl: string | null;
}

type Token = {
  id: string;
  token_mint: string;
  symbol: string;
  name: string;
  imageUrl: string | null;
};

export default function PaymentPage({
  paymentDetails,
  supportedTokens,
  MerchantWallet,
}: {
  paymentDetails: IPaymentDetails;
  supportedTokens: Token[];
  MerchantWallet: string;
}) {
  const router = useRouter();
  const { connection } = useConnection();
  const { signTransaction, publicKey, connected } = useWallet();
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<string>(
    paymentDetails.amount?.toString() || "",
  );
  const [isLoading, setIsLoading] = useState(false);

  // Set the first token as default when component loads
  useEffect(() => {
    if (supportedTokens.length > 0 && !selectedToken) {
      setSelectedToken(supportedTokens[0]);
    }
  }, [supportedTokens, selectedToken]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tokenId = e.target.value;
    const token = supportedTokens.find((t) => t.id === tokenId) || null;
    setSelectedToken(token); // Fixed: was setting to selectedToken instead of token
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow valid numbers
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePayment = async () => {
    if (!selectedToken || !amount || isNaN(parseFloat(amount))) {
      alert("Please select a token and enter a valid amount");
      return;
    }

    setIsLoading(true);
    if (!signTransaction || !publicKey) {
      return;
    }
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey as PublicKey,
        toPubkey: new PublicKey(MerchantWallet),
        lamports: Number(amount) * LAMPORTS_PER_SOL, // Convert SOL to lamports
      }),
    );
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;
    const signedTransaction = await signTransaction(transaction);
    console.log(signedTransaction.serialize().toString("base64"));
    const res = await SendSignedTransactionToBlockchain({
      signedTransactionBase64: signedTransaction.serialize().toString("base64"),
    });
    if (res.success) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Payment successful!");
      router.push(`https://solscan.io/tx/${res.data}?cluster=devnet`);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
        {/* Payment Image */}
        <div className="w-full h-56 relative bg-gradient-to-r from-blue-600 to-purple-700">
          {paymentDetails.icon ? (
            <Image
              src={paymentDetails.icon}
              alt={paymentDetails.title}
              width={400}
              height={200}
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-white text-5xl font-bold drop-shadow-lg">
                {paymentDetails.title}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Payment Details */}
        <div className="p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {paymentDetails.title}
          </h1>

          {/* Description */}
          {paymentDetails.description && (
            <p className="text-gray-600 mb-8 leading-relaxed">
              {paymentDetails.description}
            </p>
          )}

          {/* Token Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Token
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={selectedToken?.id || ""}
              onChange={handleTokenChange}
            >
              {supportedTokens.map((token) => (
                <option key={token.id} value={token.id}>
                  {token.name} ({token.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative rounded-lg shadow-sm">
              <input
                type="text"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                disabled={paymentDetails.amount_type === "FIXED"}
              />
              {selectedToken && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">
                    {selectedToken.symbol}
                  </span>
                </div>
              )}
            </div>
            {paymentDetails.amount_type === "FIXED" && (
              <p className="mt-2 text-sm text-gray-500">
                Fixed amount specified by the merchant
              </p>
            )}
          </div>

          {connected ? (
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing Payment...
                </>
              ) : (
                `Pay ${amount ? `${amount} ${selectedToken?.symbol || ""}` : "Now"}`
              )}
            </button>
          ) : (
            <WalletButton />
          )}
        </div>
      </div>
      {selectedToken && (
        <div className="mt-6 w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center">
            {selectedToken.imageUrl && (
              <div className="h-12 w-12 relative mr-4">
                <Image
                  src={selectedToken.imageUrl}
                  alt={selectedToken.name}
                  width={48}
                  height={48}
                  className="rounded-full object-contain p-1 border border-gray-200 bg-gray-50"
                />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedToken.name} ({selectedToken.symbol})
              </h3>
              <p className="text-sm text-gray-600">
                Token:{" "}
                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                  {selectedToken.token_mint}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
