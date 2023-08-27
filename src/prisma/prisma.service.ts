import { Injectable } from '@nestjs/common';
import { PrismaClient } from "@prisma/client"
import { resolve } from 'node:path';

@Injectable()
export class PrismaService extends PrismaClient{
  constructor(){
    super({
      datasources: {
        db: {
          // use path resolve to get root directory.
          // __dirname will return dir where compiled app run (/dist)
          url : `File:${resolve("./prisma/dev.db")}`
        }
      }
    });
  }
}
