import {
  IsEmail,
  IsString,
  Length,
  Matches,
  MaxLength,
  Validate,
} from 'class-validator';
import { Unique } from 'src/validators/unique.validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @Length(5, 64)
  @Validate(Unique, [User])
  username: string;

  @IsEmail()
  @MaxLength(256)
  @Validate(Unique, [User])
  email: string;

  @IsString()
  @Length(8, 64)
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%@&? "\']).+$')
  password: string;
}
