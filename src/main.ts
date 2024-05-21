import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ValidationPipe } from '@nestjs/common';
import { IdExceptionFilter } from './exception/id.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  //app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalFilters(new IdExceptionFilter())

  const config = new DocumentBuilder()
    .setTitle('Nest Js example')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
