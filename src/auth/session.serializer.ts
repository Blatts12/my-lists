import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersSerivce: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: any) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: Partial<User>) => void,
  ) {
    const { password, email, ...rest } = await this.usersSerivce.findOneById(
      payload.id,
    );
    done(null, rest);
  }
}
