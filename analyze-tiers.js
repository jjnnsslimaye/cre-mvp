const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

// Read .env.local manually
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    process.env[match[1]] = match[2];
  }
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TIERS = [
  { pct: 10, fileKey: 'florida/broward/yearly/mvp_data_10pct.json', password: process.env.DEMO_PASSWORD_10 },
  { pct: 20, fileKey: 'florida/broward/yearly/mvp_data_20pct.json', password: process.env.DEMO_PASSWORD_20 },
  { pct: 30, fileKey: 'florida/broward/yearly/mvp_data_30pct.json', password: process.env.DEMO_PASSWORD_30 },
  { pct: 40, fileKey: 'florida/broward/yearly/mvp_data_40pct.json', password: process.env.DEMO_PASSWORD_40 },
  { pct: 50, fileKey: 'florida/broward/yearly/mvp_data_50pct.json', password: process.env.DEMO_PASSWORD_50 },
  { pct: 60, fileKey: 'florida/broward/yearly/mvp_data_60pct.json', password: process.env.DEMO_PASSWORD_60 },
  { pct: 70, fileKey: 'florida/broward/yearly/mvp_data_70pct.json', password: process.env.DEMO_PASSWORD_70 },
  { pct: 80, fileKey: 'florida/broward/yearly/mvp_data_80pct.json', password: process.env.DEMO_PASSWORD_80 },
  { pct: 90, fileKey: 'florida/broward/yearly/mvp_data_90pct.json', password: process.env.DEMO_PASSWORD_90 },
  { pct: 100, fileKey: 'florida/broward/yearly/mvp_data_100pct.json', password: process.env.DEMO_PASSWORD_100 },
];

async function analyzeTier(tier) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: tier.fileKey,
    });

    const response = await s3Client.send(command);
    const bodyString = await response.Body.transformToString();
    const loans = JSON.parse(bodyString);

    const urgencyCounts = {
      critical: 0,
      'near-term': 0,
      'mid-term': 0,
      'long-term': 0,
    };

    loans.forEach(loan => {
      if (urgencyCounts[loan.loan_urgency] !== undefined) {
        urgencyCounts[loan.loan_urgency]++;
      }
    });

    return {
      pct: tier.pct,
      password: tier.password,
      total: loans.length,
      ...urgencyCounts,
    };
  } catch (error) {
    return {
      pct: tier.pct,
      password: tier.password,
      total: 0,
      critical: 0,
      'near-term': 0,
      'mid-term': 0,
      'long-term': 0,
      error: error.message,
    };
  }
}

async function main() {
  console.log('Tier\tPassword\tTotal\tCritical\tNear-Term\tMid-Term\tLong-Term');

  for (const tier of TIERS) {
    const result = await analyzeTier(tier);
    console.log(
      `${result.pct}%\t${result.password}\t${result.total}\t${result.critical}\t${result['near-term']}\t${result['mid-term']}\t${result['long-term']}`
    );
  }
}

main().catch(console.error);
