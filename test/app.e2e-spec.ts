import {Test} from '@nestjs/testing'
import * as pactum from "pactum"; 

import { AppModule } from '../src/app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';




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
    await app.listen(3006);

    // make prisma clean database every test
    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    // set url for pactum http request
    pactum.request.setBaseUrl("http://localhost:3006");
  })

  afterAll(() => {
    app.close();
  })

  describe('Auth', () => {
    describe("Sign up", () => {
      const dto: AuthDto = {
        email: "zidan@email.com",
        password: "saya ada 2"
      }
      it("Should throw if email empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({
            password: dto.password,
            email: "" 
          })
          .expectStatus(400)
      })
      it("Should throw if password empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({
            password: "",
            email: dto.email
          })
          .expectStatus(400)
      })
      it("Should throw if body empty", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody({
            password: "",
            email: ""
          })
          .expectStatus(400)
      })
      it("Should signup", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody(dto)
          .expectStatus(201)
      })
    });

    describe("Sign in", () => {
      const dto: AuthDto = {
        email: "zidan@email.com",
        password: "saya ada 2"
      }
      it("Should throw if email empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({
            password: dto.password,
            email: "" 
          })
          .expectStatus(400)
      })
      it("Should throw if password empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({
            password: "",
            email: dto.email
          })
          .expectStatus(400)
      })
      it("Should throw if body empty", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody({
            password: "",
            email: ""
          })
          .expectStatus(400)
      })
      it("Should signin", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody(dto)
          .expectStatus(200)
          // it's gotten from response body ~~~~vv save to in memory pactum store
          .stores("userAccessToken", "access_token")
      })
    });
  })

  describe('User', () => {
    describe("Get me", () => {
      it("Should get current user", () => {
        return pactum
          .spec()
          .withHeaders({
            // pactum special syntaxt v~~~~~~~~~~~~~~v to get stored data
            Authorization : "Bearer $S{userAccessToken}"
          })
          .post("/user/me")
          .expectStatus(200)
      })
    });

    const editUserDto = {
      email: "zidancahhil@fmail.com",
      lastName: "rahman"
    }

    describe('Edit User', () => {
      return pactum
        .spec()
        .withHeaders({
          // pactum special syntaxt v~~~~~~~~~~~~~~v to get stored data
          Authorization : "Bearer $S{userAccessToken}"
        })
        .patch("/user")
        .withBody(editUserDto)
        .expectStatus(200)
    });
  });

  describe('Bookmark', () => {
    describe("Get empty bookmark", () => {
      it("Should get empty array as body", () => {
        return pactum
        .spec()
        .withHeaders({
          // pactum special syntaxt v~~~~~~~~~~~~~~v to get stored data
          Authorization : "Bearer $S{userAccessToken}"
        })
        .get("/bookmark")
        .expectStatus(200)
        .expectBody([])
      })
    })

    describe("Create Bookmark", () => {
      const dto: CreateBookmarkDto = {
        link: "https://localhost.com",
        title: "ini adalah bookmark",
        description: "bookmark saya"
      }
      it("Should create bookmark", () => {
        return pactum
        .spec()
        .withHeaders({
          // pactum special syntaxt v~~~~~~~~~~~~~~v to get stored data
          Authorization : "Bearer $S{userAccessToken}"
        })
        .withBody(dto)
        .post("/bookmark")
        .expectStatus(201)
        .stores("bookmarkId", "id");
      })
    });

    describe('Get Bookmarks', ()=>{
      it("Should get array with lengt 1", () => {
        return pactum
        .spec()
        .withHeaders({
          // pactum special syntaxt v~~~~~~~~~~~~~~v to get stored data
          Authorization : "Bearer $S{userAccessToken}"
        })
        .get("/bookmark")
        .expectStatus(200)
        .expectJsonLength(1)
      })
    });
    describe('Get Bookmark by id', ()=>{
      it("Should get Bookmark by id", () => {
        return pactum
        .spec()
        .withHeaders({
          // pactum special syntaxt v~~~~~~~~~~~~~~v to get stored data
          Authorization : "Bearer $S{userAccessToken}"
        })
        .get("/bookmark/{id}")
        // here this is        v~~~~~~~~~~~~v
        .withPathParams("id", "$S{bookmarkId}")
        .expectStatus(200)
      })
    });

    describe('Edit Bookmark by id', ()=>{
      const dto: EditBookmarkDto = {
        link: "https://localhost.com",
        title: "ini adalah bookmark",
        description: "bookmark saya terupdate"
      }
      it("Should update Bookmark by id", () => {
        return pactum
        .spec()
        .withHeaders({
          // pactum special syntaxt v~~~~~~~~~~~~~~v to get stored data
          Authorization : "Bearer $S{userAccessToken}"
        })
        .withBody(dto)
        .patch("/bookmark/{id}")
        // here this is        v~~~~~~~~~~~~v
        .withPathParams("id", "$S{bookmarkId}")
        .expectStatus(200)
      })
    });

    describe('Delete Bookmark by id', ()=>{
      it("Should delete Bookmark by id", () => {
        return pactum
        .spec()
        .withHeaders({
          // pactum special syntaxt v~~~~~~~~~~~~~~v to get stored data
          Authorization : "Bearer $S{userAccessToken}"
        })
        .delete("/bookmark/{id}")
        // here this is        v~~~~~~~~~~~~v
        .withPathParams("id", "$S{bookmarkId}")
        .expectStatus(200)
      })
    });
  });

  describe("Get empty bookmark", () => {
    it("Should get empty array as body", () => {
      return pactum
      .spec()
      .withHeaders({
        // pactum special syntaxt v~~~~~~~~~~~~~~v to get stored data
        Authorization : "Bearer $S{userAccessToken}"
      })
      .get("/bookmark")
      .expectStatus(200)
      .expectJsonLength(0)
    })
  })
})