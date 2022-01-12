import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login() {
    return { msg: 'login.success' };
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Session() session, @Res() response) {
    session.destroy((err) => {
      if (err) {
        response.status(400).send('Unable to log out!');
      } else {
        response.send('Logout successful!');
      }
    });
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { password, email, ...rest } = await this.usersService.create(
      createUserDto,
    );
    return rest;
  }
}
