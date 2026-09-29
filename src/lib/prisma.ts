import { PrismaClient } from '@prisma/client';

// Automatically detect Supabase integration variables from Vercel (with or without 'htsadmin_' prefix)
const dbUrl =
  process.env.DATABASE_URL ||
  process.env.htsadmin_POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.htsadmin_POSTGRES_URL ||
  process.env.POSTGRES_URL;

if (dbUrl && !process.env.DATABASE_URL) {
  process.env.DATABASE_URL = dbUrl;
}

if (!process.env.DIRECT_URL) {
  const directUrl =
    process.env.htsadmin_POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL_NON_POOLING ||
    dbUrl;
  if (directUrl) process.env.DIRECT_URL = directUrl;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: dbUrl
      ? {
          db: {
            url: dbUrl,
          },
        }
      : undefined,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;



