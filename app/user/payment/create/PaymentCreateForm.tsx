"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $Enums } from "@prisma/client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { payment_category, UserWallet } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { GetPreSignedUrl } from "@/app/actions/aws";
import { v6 } from "uuid";
import { CreatePayment } from "@/app/actions/database";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Payment_details_Schema = z.object({
  payment_type: z.nativeEnum($Enums.payment_type, {
    message: "Payment type Required",
  }),
  amount_type: z.nativeEnum($Enums.amount_type, {
    message: "Amount type Required",
  }),
  amount: z.number({ message: "Enter a number" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  payment_category: z.string({ message: "Payment Category Required" }),
  wallet: z.string({ message: "Wallet is required" }),
  redirectUrl: z.string(),
  webhookUrl: z.string(),
});

type Inputs = z.infer<typeof Payment_details_Schema>;

export function PaymentCreateForm({
  payment_category,
  UserWallet,
}: {
  payment_category: payment_category[];
  UserWallet: UserWallet[];
}) {
  const router = useRouter();
  const session = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
    setValue,
    clearErrors,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(Payment_details_Schema),
  });
  const [file, setFile] = useState<File | null>(null);
  const [iconUrl, setIconUrl] = useState(
    "https://static.aaraz.me/payko/money.png",
  );
  const onSubmit: SubmitHandler<Inputs> = async (InputFormData) => {
    let PaymentIconUrl = iconUrl;
    if (file) {
      console.log("Uploading Image");
      const {
        data: { fields, key, url },
      } = await GetPreSignedUrl({
        fileName: v6() + "." + file?.name.split(".")[1],
        contentType: file?.type as string,
      });
      const formData = new FormData();
      Object.entries(fields as Record<string, string>).forEach(
        ([key, value]) => {
          formData.append(key, value);
        },
      );
      formData.append("file", file as File);
      const response = await fetch(url as string, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        alert("Image Upload Failed! Try Again");
        return;
      } else {
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const imageLocation =
          xmlDoc.getElementsByTagName("Location")[0]?.childNodes[0]?.nodeValue;
        let IMGURL = new URL(imageLocation as string);
        IMGURL.hostname = "dalrhzyq3imlu.cloudfront.net";
        PaymentIconUrl = decodeURIComponent(IMGURL.toString());
      }
    }
    const res = await CreatePayment({
      amount: InputFormData.amount,
      amount_type: InputFormData.amount_type,
      description: InputFormData.description,
      title: InputFormData.title,
      payment_type: InputFormData.payment_type,
      category_id: InputFormData.payment_category,
      icon: PaymentIconUrl,
      wallet_id: InputFormData.wallet,
      webhookUrl: InputFormData.webhookUrl,
      redirectUrl: InputFormData.redirectUrl,
      userEmail: session.data?.user?.email as string,
    });
    if (res.success) {
      alert("Payment Created Successfully");
      router.replace("setup");
      return;
    } else {
      alert("Payment Creation Failed! Try Again");
      return;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title
            {errors.title && (
              <span className="text-red-400 ml-2">{errors.title.message}</span>
            )}
          </Label>
          <Input
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
            id="title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-gray-500">(optional)</span>
            {errors.description && (
              <span className="text-red-400 ml-2">
                {errors.description.message}
              </span>
            )}
          </Label>
          <Input id="description" {...register("description")} />
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <Label htmlFor="icon">Icon</Label>
            <Input
              id="icon"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFile(file);
                  setIconUrl(URL.createObjectURL(file));
                }
              }}
            />
          </div>
          <Image
            src={iconUrl}
            alt="Icon"
            height={300}
            width={300}
            className="object-cover border-2 border-gray-400  rounded-full bg-gray-300 h-[100px] w-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">
            Amount
            {errors.amount && (
              <span className="text-red-400 ml-2">{errors.amount.message}</span>
            )}
          </Label>
          <Input
            id="amount"
            {...register("amount", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount_type">
            Amount Type
            {errors.amount_type && (
              <span className="text-red-400 ml-2">
                {errors.amount_type.message}
              </span>
            )}
          </Label>
          <Controller
            control={control}
            name="amount_type"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                onValueChange={(e) => {
                  setValue("amount_type", e as $Enums.amount_type);
                  clearErrors("amount_type");
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Amount Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values($Enums.amount_type).map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payment_type">
            Payment Type
            {errors.payment_type && (
              <span className="text-red-400 ml-2">
                {errors.payment_type.message}
              </span>
            )}
          </Label>
          <Controller
            control={control}
            name="payment_type"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                onValueChange={(e) => {
                  setValue("payment_type", e as $Enums.payment_type);
                  clearErrors("payment_type");
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values($Enums.payment_type).map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payment_category">
            Payment Category
            {errors.payment_category && (
              <span className="text-red-400 ml-2">
                {errors.payment_category.message}
              </span>
            )}
          </Label>
          <Controller
            control={control}
            name="payment_category"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                onValueChange={(e) => {
                  setValue("payment_category", e);
                  clearErrors("payment_category");
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {payment_category.map((item) => (
                      <SelectItem key={item.id} value={item.category_id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wallet">
            Wallet
            {errors.wallet && (
              <span className="text-red-400 ml-2">{errors.wallet.message}</span>
            )}
          </Label>
          <Controller
            control={control}
            name="wallet"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                onValueChange={(e) => {
                  setValue("wallet", e);
                  clearErrors("wallet");
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Wallet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {UserWallet.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.walletname}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="redirectUrl">redirect URL</Label>
          <Input
            {...register("redirectUrl")}
            id="redirectUrl"
            placeholder="redirect URL"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="webhookUrl">Webhook URL</Label>
          <Input {...register("webhookUrl")} placeholder="Webhook URL" />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />{" "}
              <span className="pl-2">Please Wait..</span>
            </>
          ) : (
            <>Submit</>
          )}
        </Button>
      </form>
    </>
  );
}
