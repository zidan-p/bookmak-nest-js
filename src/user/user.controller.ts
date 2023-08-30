import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

// you can also move guard to controller level
// so all of it's route can be pipe with guard
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

  @Get("me")
  // the get user can hint the data from it's type.
  // in bellow code, it's hint user type from prisma client.
  // and because this request is decorate with GetUser, the user
  // props already parsed inside decorator.
  // vvvv~~~~~~~~ see decorator below
  getMe(@GetUser() user: User){
    return user;
  }
}
