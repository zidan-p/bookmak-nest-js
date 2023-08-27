import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // this will make all module can import this module without to define import metadata first
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
