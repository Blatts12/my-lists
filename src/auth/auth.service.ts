import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersSerivce: UsersService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.usersSerivce.findOneByUsername(username);
    if (!user) return null;

    const isPasswordCorrect = await User.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordCorrect) return null;

    return user;
  }
}
