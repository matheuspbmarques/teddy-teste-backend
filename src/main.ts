import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Teddy Teste Técnico')
  .setDescription('Teste técnico para desenvolvedor back-end, da Teddy')
  .setVersion('1.0.0')
  .build();

  const swaggerDocument = () => SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/api', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
