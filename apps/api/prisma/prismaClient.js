import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config({path:".env.local"});

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

//  .\..\..\node_modules\.pnpm\@prisma+client@7.4.2_prisma_9714047f8247d2608f645801aa87fded\node_modules\@prisma\client
