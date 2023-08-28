import { IsEmail, IsNotEmpty, IsString } from "class-validator";



// example using class validator
export class AuthDto{

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}