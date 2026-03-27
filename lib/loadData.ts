import 'server-only';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import type { Loan } from '@/lib/types';

// Module-level cache
let cache: Loan[] | null = null;

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucketName = process.env.S3_BUCKET!;

export async function getLoans(): Promise<Loan[]> {
  // Return cache if available
  if (cache !== null) {
    return cache;
  }

  // Fetch the single file
  const getCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: 'florida/broward/yearly/mvp_data.json',
  });

  const response = await s3Client.send(getCommand);

  if (!response.Body) {
    cache = [];
    return cache;
  }

  // Read the stream and parse JSON
  const bodyString = await response.Body.transformToString();
  const data = JSON.parse(bodyString);

  // The file contains an array of loan records
  if (Array.isArray(data)) {
    cache = data;
  } else {
    cache = [];
  }

  return cache;
}

export async function getLoanById(id: string): Promise<Loan | undefined> {
  const loans = await getLoans();
  return loans.find((loan) => loan.doc_number === id);
}
