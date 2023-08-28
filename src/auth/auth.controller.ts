import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { resolve } from "node:path";
import { AuthDto } from "./dto";




// where the request routed to each service or logic.
// prefix path to request, it will pass to request method as prefix (see below).
@Controller("auth")
export class AuthController{

  // the injection will be handled by nestjs
  constructor(
    private authService: AuthService
  ){}
  
  // :POST /auth/signup
  @Post("signup") 
  signup(@Body() body: AuthDto){
    console.log({body})
    return this.authService.signup();
  }

  // :POST /auth/signin
  @Post("signin") 
  signin(@Req() req : Request){
    return this.authService.signin();
  }


}