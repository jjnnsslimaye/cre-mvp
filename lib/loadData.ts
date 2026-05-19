import 'server-only';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import type { Loan } from '@/lib/types';
import { TIERS } from '@/lib/tiers';

// Per-tier cache
const tierCache = new Map<number, Loan[]>();

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucketName = process.env.S3_BUCKET!;

export async function getLoans(pct?: number): Promise<Loan[]> {
  const tierPct = pct ?? 10; // default to 10% for unauthenticated
  console.log('getLoans called with pct:', tierPct);
  console.log('tierCache has pct?', tierCache.has(tierPct));

  // Return cache if available for this tier
  if (tierCache.has(tierPct)) {
    return tierCache.get(tierPct)!;
  }

  // Find the matching tier
  const tier = TIERS.find(t => t.pct === tierPct);
  console.log('fetching S3 key:', tier?.fileKey);
  if (!tier) {
    console.error(`No tier found for pct: ${tierPct}`);
    return [];
  }

  // Fetch the tier-specific file
  const getCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: tier.fileKey,
  });

  const response = await s3Client.send(getCommand);

  if (!response.Body) {
    tierCache.set(tierPct, []);
    return [];
  }

  // Read the stream and parse JSON
  const bodyString = await response.Body.transformToString();
  const data = JSON.parse(bodyString);

  // The file contains an array of loan records
  let loans: Loan[] = [];
  if (Array.isArray(data)) {
    loans = data;
  }

  tierCache.set(tierPct, loans);
  return loans;
}

export async function getLoanById(id: string, pct?: number): Promise<Loan | undefined> {
  const loans = await getLoans(pct);
  return loans.find((loan) => loan.doc_number === id);
}
