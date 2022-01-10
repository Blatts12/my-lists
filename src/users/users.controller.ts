import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserProfileDto } from './dto/user-profile.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<UserProfileDto> {
    const { email, password, ...rest }: User =
      await this.usersService.findOneByUsername(req.user.username);
    const userProfile: UserProfileDto = rest;
    return userProfile;
  }
}
