import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// where the logic took place
@Injectable({})
export class AuthService{

  constructor(
    private prisma: PrismaService
  ){}
  
  async signup(dto: AuthDto){

    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);
  
      // save user in database
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      })
  
      delete newUser.hash; // don't let hash exposed
  
      // return new user
      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError){
        // constraint failed, ex: multiple same value for uniqe field
        if(error.code === "P2002")
          throw new ForbiddenException('Credentials taken');
      }

      throw error;
    }

  }

  signin(){

    // find the user by email

    //throw exception when empty


    // compare password

    // throw when failed / don't match

    // send back user
    return {msg: "i'm signin to get bookmark"}
  }

}