import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.getOrThrow<string>('DATABASE_URL'),
        },
      },
    } as Prisma.PrismaClientOptions); // <--- The Fix: Cast to bypass strict type check
  }

  async onModuleInit() {
    await this.$connect();
  }
}
