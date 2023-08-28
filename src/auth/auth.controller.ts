import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
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
  signup(@Body() dto: AuthDto){
    return this.authService.signup(dto);
  }

  // :POST /auth/signin
  @Post("signin") 
  signin(@Body() dto: AuthDto){
    return this.authService.signin(dto);
  }


}