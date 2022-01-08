import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ValidatorsModule } from './validators/validators.module';
import TypeOrmConfig from './typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => TypeOrmConfig,
    }),
    UsersModule,
    AuthModule,
    ValidatorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
