import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ValidationPipe } from '@nestjs/common';
import { IdExceptionFilter } from './exception/id.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  //app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalFilters(new IdExceptionFilter())
  await app.listen(3000);
}
bootstrap();
