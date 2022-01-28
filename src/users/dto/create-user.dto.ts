import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Unique } from 'src/validators/unique/unique.validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MaxLength(64, {
    message: 'Username must be at most 64 characters',
  })
  @MinLength(5, {
    message: 'Username must be at least 5 characters',
  })
  @Validate(Unique, [User], {
    message: 'User with this username already exists',
  })
  username: string;

  @IsEmail()
  @MaxLength(256)
  @Validate(Unique, [User], {
    message: 'User with this email already exists',
  })
  email: string;

  @IsString()
  @MaxLength(64, {
    message: 'Password must be at most 64 characters',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters',
  })
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%@&? "\']).+$', '', {
    message:
      'Password must contain one small and big letter, one digit and one special character',
  })
  password: string;
}
