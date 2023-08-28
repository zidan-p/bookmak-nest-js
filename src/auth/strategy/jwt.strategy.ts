import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){
  
  constructor(
    config: ConfigService,
    private prisma: PrismaService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET")
    });
  }

  async validate(payload: {sub: number, email: string}){

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub
      }
    })

    delete user.hash;

    // if user is null it will throw credenstial exception to user

    // it will be appended in request object.
    // like in teh express there are middlewares. so when we try to chain from one middleware 
    // to another middleware, we use `next(req)` function with req object to make data still consistent.
    // in here (validate), we will pass payload as new properties in req express object 
    // by return-ed it.
    return user;
  }
}