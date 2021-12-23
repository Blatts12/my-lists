import { IsEmail, IsString, Length, Matches, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(5, 64)
  username: string;

  @IsEmail()
  @MaxLength(256)
  email: string;

  @IsString()
  @Length(8, 64)
  @Matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%@&? "\']).+$')
  password: string;
}
