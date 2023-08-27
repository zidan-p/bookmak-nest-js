import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


// where the logic took place
@Injectable({})
export class AuthService{

  constructor(
    private prisma: PrismaService
  ){}

  signin(){
    // nestjs automatically set that datatype in header coresponding with the return type
    // so the datatype below will be plain text
    // return "I am signin"; 

    // it will be object json
    return {msg: "i'm signin to get bookmark"}
  }

  signup(){
    return {msg: "starting the day to get bookmark"};
  }
}