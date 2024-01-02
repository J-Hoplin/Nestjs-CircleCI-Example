import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getSomeDatas() {
    return this.prisma.someDatabase.findMany();
  }

  async createData() {
    const title = `New title - ${new Date().toISOString()}`;
    const content = `New content - ${new Date().toISOString()}`;
    return await this.prisma.someDatabase.create({
      data: {
        title,
        content,
      },
    });
  }
}
