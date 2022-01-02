import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('reg')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
          status: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
