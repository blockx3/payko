"use server";
/*

IMPORTANT: 
This file contains Nextjs Actions function 
which exposes POST endpoint in the APP
any exported async function is a POST endpoint
so while writing any more action function remember 
to check auth() before executing any action

This is the function to check auth()
write it at very first lines of function starting

const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

*/
// TODO: add revalidatePath for cache invalidation as required
import nacl from "tweetnacl";
import { pbkdf2Sync } from "pbkdf2";
import { $Enums } from "@prisma/client";
import {
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  sendAndConfirmTransaction,
  Keypair,
} from "@solana/web3.js";
import prisma from "@/lib/db";
import { SecretBoxLength } from "@/lib/constents";
import { auth } from "@/auth";
import {
  CreateTransaction,
  getDBuser,
  getUserWalletKeypair,
} from "@/lib/utils";
import { conn } from "@/lib/solana";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { v6 } from "uuid";
import { revalidatePath } from "next/cache";

export async function CreateUserWallet({
  pin,
  email,
  chain,
}: {
  pin: string;
  email: string;
  chain: $Enums.Chain;
}) {
  const session = await auth();
  if (!session || session.user?.email != email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    const userDB = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        UserWallet: true,
      },
    });
    const randomNickName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      length: 2,
      separator: "-",
    });
    if (userDB?.UserWallet.length != 0) {
      return {
        success: false,
        message: "Wallet already created",
      };
    }
    const keypair = Keypair.generate();
    const getSalt = nacl.randomBytes(16);
    const key = pbkdf2Sync(pin, getSalt, 100000, SecretBoxLength.Key, "sha512");
    const nonce = nacl.randomBytes(SecretBoxLength.Nonce);
    const messageUint8 = keypair.secretKey.buffer;
    const encryptedPrivateKey = nacl.secretbox(
      Buffer.from(messageUint8),
      nonce,
      key,
    );
    await prisma.$transaction([
      prisma.userWallet.create({
        data: {
          userId: userDB?.id as string,
          chain: chain,
          walletname: "Main",
          publicKey: keypair.publicKey.toString(),
          privateKey: encryptedPrivateKey.toString(),
          salt_for_pin: getSalt.toString(),
          nonce_for_encryption: nonce.toString(),
        },
      }),
      prisma.user.update({
        where: {
          email: email,
        },
        data: {
          nickname: randomNickName,
          initalized: true,
        },
      }),
    ]);

    return {
      success: true,
      message: "Wallet created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error creating wallet",
    };
  }
}

export async function SendCrypto({
  chain,
  transationPin,
  amount,
  to,
}: {
  chain: $Enums.Chain;
  transationPin: string;
  amount: number;
  to: string;
}) {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  switch (chain) {
    case $Enums.Chain.SOLANA:
      const userKeyPair = await getUserWalletKeypair({
        chain: chain,
        pin: transationPin,
        email: session?.user?.email as string,
      });
      if (!userKeyPair) {
        return {
          success: false,
          message: "Invalid pin",
        };
      }
      try {
        const userDb = await getDBuser(session.user?.email as string);
        const trans = new Transaction();
        const PubSender = new PublicKey(userKeyPair.publicKey);
        const PubReceiver = new PublicKey(to);
        const tranData = SystemProgram.transfer({
          fromPubkey: PubSender,
          toPubkey: PubReceiver,
          lamports: LAMPORTS_PER_SOL * amount,
        });
        trans.add(tranData);
        const transection_hash = await sendAndConfirmTransaction(conn, trans, [
          userKeyPair,
        ]);
        await CreateTransaction({
          to: to,
          from: PubSender.toString(),
          amount: amount,
          chain: chain,
          userId: userDb?.id as string,
          transactionType: $Enums.transaction_type.NATIVECOIN,
          transactionSignature: transection_hash,
        });
        revalidatePath("/user/transaction");
        revalidatePath("/user/wallet/send");
        return {
          success: true,
          message: transection_hash,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          message: "Error sending transaction",
        };
      }
      break;
  }
}

export async function UpdateNickName({
  email,
  nickname,
}: {
  email: string;
  nickname: string;
}) {
  const session = await auth();
  if (!session || session.user?.email != email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        nickname: nickname,
      },
    });
    revalidatePath("/user/profile");
    return {
      success: true,
      message: "NickName updated",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error updating nickname",
    };
  }
}

export async function AddUserWallet({
  pin,
  email,
  chain,
  walletname,
}: {
  pin: string;
  email: string;
  chain: $Enums.Chain;
  walletname: string;
}) {
  const session = await auth();
  if (!session || session.user?.email != email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    const userDB = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        UserWallet: true,
      },
    });
    const keypair = Keypair.generate();
    const getSalt = nacl.randomBytes(16);
    const key = pbkdf2Sync(pin, getSalt, 100000, SecretBoxLength.Key, "sha512");
    const nonce = nacl.randomBytes(SecretBoxLength.Nonce);
    const messageUint8 = keypair.secretKey.buffer;
    const encryptedPrivateKey = nacl.secretbox(
      Buffer.from(messageUint8),
      nonce,
      key,
    );
    await prisma.$transaction([
      prisma.userWallet.create({
        data: {
          userId: userDB?.id as string,
          chain: chain,
          walletname: walletname,
          publicKey: keypair.publicKey.toString(),
          privateKey: encryptedPrivateKey.toString(),
          salt_for_pin: getSalt.toString(),
          nonce_for_encryption: nonce.toString(),
        },
      }),
      prisma.user.update({
        where: {
          email: email,
        },
        data: {
          initalized: true,
        },
      }),
    ]);
    revalidatePath("/user/profile");
    return {
      success: true,
      message: "Wallet created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error creating wallet",
    };
  }
}

export async function DeleteUserWallet({
  email,
  walletId,
  walletname,
}: {
  email: string;
  walletId: string;
  walletname: string;
}) {
  const session = await auth();
  if (!session || session.user?.email != email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  const wallet = await prisma.userWallet.findUnique({
    where: {
      id: walletId,
    },
  });
  if (wallet?.walletname == "Main") {
    return {
      success: false,
      message: "Cannot delete main wallet",
    };
  }
  try {
    await prisma.userWallet.delete({
      where: {
        id: walletId,
      },
    });
    revalidatePath("/user/profile");
    return {
      success: true,
      message: "Wallet deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error deleting wallet",
    };
  }
}

export async function CreatePaymentCategory({
  email,
  userId,
  name,
}: {
  email: string;
  userId: string;
  name: string;
}) {
  const session = await auth();
  if (!session || session.user?.email != email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    await prisma.payment_category.create({
      data: {
        name: name,
        userId: userId,
        category_id: v6(),
      },
    });
    // revalidatePath("/user/payment/setup");
    return {
      success: true,
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to create Category try again !",
    };
  }
}

export async function TogglePaymentCategory({
  state,
  email,
  category_id,
}: {
  state: boolean;
  email: string;
  category_id: string;
}) {
  const session = await auth();
  if (!session || session.user?.email != email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        payment_category: true,
      },
    });
    if (
      user?.payment_category.find(
        (category) => category.category_id == category_id,
      )
    ) {
      await prisma.payment_category.update({
        where: {
          category_id: category_id,
        },
        data: {
          active: state,
        },
      });
      revalidatePath("/user/payment/setup");
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        success: true,
        message: "Category updated",
      };
    }
    return {
      success: false,
      message: "Category not found",
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to Toggle , try Again !",
    };
  }
}

export async function TogglePaymentLink({
  state,
  email,
  payment_detail_id,
}: {
  state: boolean;
  email: string;
  payment_detail_id: string;
}) {
  const session = await auth();
  if (!session || session.user?.email != email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        payment_details: true,
      },
    });
    if (
      user?.payment_details.find(
        (payment_detail) => payment_detail.id == payment_detail_id,
      )
    ) {
      await prisma.payment_details.update({
        where: {
          id: payment_detail_id,
        },
        data: {
          active: state,
        },
      });
      revalidatePath("/user/payment/setup");
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        success: true,
        message: "Payment Detail updated",
      };
    }
    return {
      success: false,
      message: "Payment Detail not found",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unable to Toggle , try Again !",
    };
  }
}

export async function DeletePaymentCategory({
  email,
  category_id,
}: {
  email: string;
  category_id: string;
}) {
  const session = await auth();
  if (!session || session.user?.email != email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    await prisma.payment_category.delete({
      where: {
        category_id: category_id,
      },
    });
    revalidatePath("/user/payment/setup");
    return {
      success: true,
      message: "Category deleted",
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to delete Category try again !",
    };
  }
}
export async function DeletePaymentDetail({
  email,
  PaymentDetailId,
}: {
  email: string;
  PaymentDetailId: string;
}) {
  const session = await auth();
  if (!session || session.user?.email != email) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    await prisma.payment_details.delete({
      where: {
        id: PaymentDetailId,
      },
    });
    revalidatePath("/user/payment/setup");
    return {
      success: true,
      message: "Category deleted",
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to delete Category try again !",
    };
  }
}

export async function CreatePayment({
  payment_type,
  amount_type,
  amount,
  icon,
  title,
  description,
  category_id,
  wallet_id,
  userEmail,
  redirectUrl,
  webhookUrl,
}: {
  payment_type: $Enums.payment_type;
  amount_type: $Enums.amount_type;
  amount: number;
  icon: string;
  title: string;
  description?: string;
  category_id: string;
  wallet_id: string;
  userEmail: string;
  redirectUrl: string;
  webhookUrl: string;
}) {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }
  try {
    const res = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    await prisma.payment_details.create({
      data: {
        payment_type: payment_type,
        amount_type: amount_type,
        amount: amount,
        icon: icon,
        title: title,
        description: description || "",
        category_id: category_id,
        userWalletId: wallet_id,
        userId: res?.id as string,
        redirectUrl: redirectUrl,
        webhookUrl: webhookUrl,
      },
    });
    revalidatePath("/user/payment/setup");
    return {
      success: true,
      message: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed",
    };
  }
}
