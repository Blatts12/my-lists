import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
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
    const { password, email, ...returnUser } = request.user;
    return { user: returnUser };
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() request, @Res() response) {
    request.logOut();
    response.status(200).clearCookie('connect.sid');
    request.session.destroy();
    response.send();
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { password, email, ...returnUser } = await this.usersService.create(
      createUserDto,
    );
    return { user: returnUser };
  }

  @Get('load')
  @UseGuards(AuthenticatedGuard)
  async loadUser(@Req() request: RequestWithUser) {
    return request.user;
  }
}
