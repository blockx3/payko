"use server";
import { auth } from "@/auth";
import { s3Client } from "@/lib/AWS";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

export async function GetPreSignedUrl({
  fileName,
  contentType,
}: {
  fileName: string;
  contentType: string;
}) {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
      data: {},
    };
  }
  const key = `payko/payment_details/icons/${fileName}`;
  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: "aaraz-main",
    Key: key,
    Conditions: [
      ["content-length-range", 0, 2 * 1024 * 1024], // 2 MB max
    ],
    Fields: {
      success_action_status: "201",
      "Content-Type": contentType,
    },
    Expires: 600,
  });
  return {
    success: true,
    message: "",
    data: {
      url,
      fields,
      key,
    },
  };
}
