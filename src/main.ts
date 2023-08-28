import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {resolve} from "node:path"
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(

    // register validation pipe globaly
    // so class validator can be used in every request
    // ⚠️⚠️ use type raw json to request data
    new ValidationPipe({

      // only accept properties that present / have decorator in dto
      whitelist: true,
    })
  )
  await app.listen(3006);
}
bootstrap();
 