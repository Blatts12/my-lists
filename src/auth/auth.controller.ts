import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { InvalidCredentialsException } from './invalid-credentials.exception';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const token = await this.authService.login(body);
    if (!token) {
      throw new InvalidCredentialsException();
    }

    return token;
  }

  @Post('reg')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }
}
