import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name} for Cloudflare R2.`);
  }
  return value;
}

let client: S3Client | null = null;

export function getR2Client(): S3Client {
  if (client) return client;

  const accountId = requiredEnv("R2_ACCOUNT_ID");

  client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requiredEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requiredEnv("R2_SECRET_ACCESS_KEY"),
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });

  return client;
}

export function getR2Bucket(): string {
  return requiredEnv("R2_BUCKET_NAME");
}

/** Public base URL for objects, e.g. https://pub-xxx.r2.dev or a custom domain */
export function getR2PublicBaseUrl(): string {
  return requiredEnv("R2_PUBLIC_URL").replace(/\/$/, "");
}

export async function uploadToR2(input: {
  key: string;
  body: Buffer;
  contentType: string;
}): Promise<string> {
  const bucket = getR2Bucket();

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: input.key,
      Body: input.body,
      ContentType: input.contentType,
    }),
  );

  return `${getR2PublicBaseUrl()}/${input.key}`;
}
