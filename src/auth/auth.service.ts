import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

// where the logic took place
@Injectable({})
export class AuthService{

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
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
  
      // return new user token
      return this.signToken(newUser.id, newUser.email);
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

    // send back token
    delete user.hash;
    return this.signToken(user.id, user.email);
  }


  async signToken(userId: number, email: string): Promise<{access_token: string}>{
    const payload = {
      sub: userId, // common jwt convention for unique or identifier field
      email
    }

    // secret key to make sure when we receive token, it know if it from us seen from it's secret key
    const secret = this.config.get("JWT_SECRET");

    const token  = await this.jwt.signAsync(payload, {
      expiresIn: "15m",
      secret
    })

    return {
      access_token: token
    }

  }

}