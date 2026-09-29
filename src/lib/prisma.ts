// Safely import and initialize PrismaClient with fallback for build and environments without generated client
let prismaInstance: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require('@prisma/client');
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

  const globalForPrisma = global as unknown as { prisma: any };

  prismaInstance =
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

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
} catch {
  const createMock = (): any =>
    new Proxy(() => {}, {
      get: (_, prop) => {
        if (prop === 'then') return undefined;
        return () => Promise.resolve([]);
      },
      apply: () => Promise.resolve([]),
    });

  prismaInstance = new Proxy(
    {},
    {
      get: (_, model) => {
        if (model === '$transaction') {
          return async (cb: any) => (typeof cb === 'function' ? cb(prismaInstance) : []);
        }
        return createMock();
      },
    }
  );
}

export const prisma = prismaInstance;
