import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersSerivce: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.usersSerivce.findOneByUsername(username);
    if (!user) {
      return null;
    }

    const isPasswordCorrect = await User.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return null;
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      return null;
    }

    const { password, email, ...rest } = user;
    return {
      access_token: await this.createToken(rest),
    };
  }

  async createToken(payload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
