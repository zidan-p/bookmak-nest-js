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

  // decarator to define what method to handle and what route.
  @Post("signin") // :POST /auth/signin
  signin(){
    // nestjs automatically set that datatype in header coresponding with the return type
    // so the datatype below will be plain text
    // return "I am signin"; 

    // it will be object json
    return {msg: "hello i'm signin"}
  }

  @Post("signout") // :POST /auth/signout
  signout(){
    return "I am signout";
  }

}