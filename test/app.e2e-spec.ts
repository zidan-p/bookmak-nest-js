import {Test} from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';



describe("App e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    )

    await app.init();

    // make prisma clean database every test
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  })

  afterAll(() => {
    app.close();
  })

  describe('Auth', () => {
    describe("Sign up", () => {});

    describe("Sign in", () => {});
  })

  describe('User', () => {
    describe("Get me", () => {});

    describe('Edit User', () => {});
  });

  describe('Bookmark', () => {
    describe("Create Bookmark", () => {});

    describe('Get Bookmarks', ()=>{});
    describe('Get Bookmark by id', ()=>{});
    describe('Edit Bookmark', ()=>{});
    describe('Delete Bookmark', ()=>{});
  });

})