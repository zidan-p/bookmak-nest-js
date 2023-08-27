import { Injectable } from "@nestjs/common";


// where the logic took place
@Injectable({})
export class AuthService{

  signin(){
    // nestjs automatically set that datatype in header coresponding with the return type
    // so the datatype below will be plain text
    // return "I am signin"; 

    // it will be object json
    return {msg: "hello i'm signin"}
  }

  signout(){
    return "I am signout";
  }
}