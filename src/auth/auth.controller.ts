import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedGuard } from './authenticated.guard';
import RequestWithUser from './dto/request-user.interface';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: RequestWithUser) {
    const { password, email, ...rest } = request.user;
    return { user: rest };
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() request, @Res() response: Response) {
    request.logOut();
    response.status(200).clearCookie('connect.sid');
    request.session.destroy();
    response.send();
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { password, email, ...rest } = await this.usersService.create(
      createUserDto,
    );
    return rest;
  }
}
