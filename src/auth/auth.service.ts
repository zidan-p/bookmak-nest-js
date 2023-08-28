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

  async signin(dto: AuthDto){

    // find the user by email
    const user = await this.prisma.user.findUnique(
      {where: {email : dto.email}}
    )

    //throw exception when empty
    if(!user) throw new ForbiddenException("Credentials incorrect");

    // compare password
    const isPasswordMatch = argon.verify(user.hash, dto.password);

    // throw when failed / don't match
    if(!isPasswordMatch) throw new ForbiddenException("Credentials incorrect");

    // send back user
    delete user.hash;
    return user;
  }

}