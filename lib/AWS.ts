import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
export const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET as string,
  },
}); // Create an S3 client service object

export async function Deletes3image({ key }: { key: string }) {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: "aaraz-main",
        Key: key,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}
