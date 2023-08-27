import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";




// where the request routed to each service or logic.
// prefix path to request, it will pass to request method as prefix (see below).
@Controller("auth")
export class AuthController{

  // the injection will be handled by nestjs
  constructor(
    private authService: AuthService
  ){}

  // :POST /auth/signin
  @Post("signin") 
  signin(){
    return this.authService.signin();
  }

  // :POST /auth/signout
  @Post("signout") 
  signout(){
    return this.authService.signout();
  }

}