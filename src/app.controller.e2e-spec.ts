import { TestingModule, Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('App Service', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get<PrismaService>(PrismaService);
    // await app.init();
    await app.listen(0);
  });

  afterAll(async () => {
    await prismaService.deleteAll();
    await app.close();
  });

  describe('AppController', () => {
    it('Should 200', () => {
      return request(app.getHttpServer()).post('/').expect(201);
    });
    it('Should 200', async () => {
      const result = await request(app.getHttpServer()).get('/');
      expect(result.statusCode).toBe(200);
      expect(result.body.length).not.toBe(0);
    });
  });
});
