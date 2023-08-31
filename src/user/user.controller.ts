import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

// you can also move guard to controller level
// so all of it's route can be pipe with guard
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

  constructor(
    private userService: UserService
  ){}

  @Get("me")
  // the get user can hint the data from it's type.
  // in bellow code, it's hint user type from prisma client.
  // and because this request is decorate with GetUser, the user
  // props already parsed inside decorator.
  // vvvv~~~~~~~~ see decorator below
  getMe(@GetUser() user: User){
    return user;
  }

  // it is self edit
  // the patch is already receied user data from token.
  @Patch()
  editUser(@GetUser("id") userId: number, @Body() dto: EditUserDto){
    return this.userService.editUser(userId, dto);
  }
}
