import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if(process.env.ENV === 'DEV') {
    await app.listen(3001);
  }

  if(process.env.ENV === 'PROD') {
    await app.listen(process.env.PORT);
  }
  
}
bootstrap();
 