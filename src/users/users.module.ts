import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
