export interface Tier {
  pct: number
  fileKey: string
  envVar: string
}

export const TIERS: Tier[] = [
  { pct: 10,  fileKey: 'florida/broward/yearly/mvp_data_10pct.json',  envVar: 'DEMO_PASSWORD_10'  },
  { pct: 20,  fileKey: 'florida/broward/yearly/mvp_data_20pct.json',  envVar: 'DEMO_PASSWORD_20'  },
  { pct: 30,  fileKey: 'florida/broward/yearly/mvp_data_30pct.json',  envVar: 'DEMO_PASSWORD_30'  },
  { pct: 40,  fileKey: 'florida/broward/yearly/mvp_data_40pct.json',  envVar: 'DEMO_PASSWORD_40'  },
  { pct: 50,  fileKey: 'florida/broward/yearly/mvp_data_50pct.json',  envVar: 'DEMO_PASSWORD_50'  },
  { pct: 60,  fileKey: 'florida/broward/yearly/mvp_data_60pct.json',  envVar: 'DEMO_PASSWORD_60'  },
  { pct: 70,  fileKey: 'florida/broward/yearly/mvp_data_70pct.json',  envVar: 'DEMO_PASSWORD_70'  },
  { pct: 80,  fileKey: 'florida/broward/yearly/mvp_data_80pct.json',  envVar: 'DEMO_PASSWORD_80'  },
  { pct: 90,  fileKey: 'florida/broward/yearly/mvp_data_90pct.json',  envVar: 'DEMO_PASSWORD_90'  },
  { pct: 100, fileKey: 'florida/broward/yearly/mvp_data_100pct.json', envVar: 'DEMO_PASSWORD_100' },
]

// Given a password, return the matching tier or null
export function getTierFromPassword(password: string): Tier | null {
  for (const tier of TIERS) {
    const envPassword = process.env[tier.envVar]
    if (envPassword && password === envPassword) return tier
  }
  return null
}
