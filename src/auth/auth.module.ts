import { Module } from "@nestjs/common/decorators";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";



// use @module decorator to tell nest if this class is a module.
// the term module in nestjs is a thing that connected acrross nestjs app.
// so rather than plain class, function or anything, a module is declared to
// make nestjs work with it. (why should nestjs work with it? of course to make work 
// with app easier, that's the point of using netsjs in this app)
@Module({

  // connect all dependency to this module here. after this, each dependency
  // can inject from one to another without afraid how it will be injected.
  // nestjs will handle that injection
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [JwtModule.register({})]
})
export class authModule {}