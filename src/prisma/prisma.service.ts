import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from "@prisma/client"
import { resolve } from 'node:path';

@Injectable()
export class PrismaService extends PrismaClient{
  constructor(
    private config: ConfigService
  ){
    super({
      datasources: {
        db: {
          // use path resolve to get root directory.
          // __dirname will return dir where compiled app run (/dist)
          url : `file:${resolve(config.get("DATABASE_PATH"))}`
        }
      }
    });
  }

  cleanDb(){
    // to make sure the deleted process in specific order
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ])
  }

}
