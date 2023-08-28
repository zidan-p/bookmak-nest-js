import { Module, ValidationPipe } from '@nestjs/common';
import { authModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [authModule, UserModule, BookmarkModule, PrismaModule],
})
export class AppModule {}
