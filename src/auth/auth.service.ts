import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";

// where the logic took place
@Injectable({})
export class AuthService{

  constructor(
    private prisma: PrismaService
  ){}
  
  async signup(dto: AuthDto){

    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save user in database
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hash,
      },

      // only return true value
      // select: {
      //   id        : true,
      //   email     : true,
      //   createdAt : true
      // }
    })

    delete newUser.hash; // don't let hash exposed

    // return new user
    return newUser;
  }

  signin(){
    // nestjs automatically set that datatype in header coresponding with the return type
    // so the datatype below will be plain text
    // return "I am signin"; 

    // it will be object json
    return {msg: "i'm signin to get bookmark"}
  }

}