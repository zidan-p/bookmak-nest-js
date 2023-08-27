import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";





@Controller()
export class AuthController{

  // the injection will be handled by nestjs
  constructor(
    private authService: AuthService
  ){}
}