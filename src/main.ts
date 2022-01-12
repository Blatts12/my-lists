import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: configService.get<string>('SESS_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: Number(configService.get('SESS_EXP_TIME')),
        sameSite: 'lax',
      },
    }),
  );
  app.disable('x-powered-by');
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
