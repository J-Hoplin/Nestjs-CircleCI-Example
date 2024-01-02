import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

describe('App Service', () => {
  let appService: AppService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
    prismaService = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.deleteAll();
  });

  describe('AppService', () => {
    it('Should create new item', async () => {
      const newItem = await appService.createData();
      expect(newItem).not.toBeUndefined();
    });

    it('Should be not an empty array', async () => {
      const result = await appService.getSomeDatas();
      expect(result.length).not.toBe(0);
    });
  });
});
