import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersSerivce: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersSerivce.findOne(username);
    const isPasswordCorrect = await User.comparePassword(
      password,
      user.password,
    );

    if (user && isPasswordCorrect) {
      const { password, email, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: User) {
    const { password, email, ...rest } = user;

    const payload = rest;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
