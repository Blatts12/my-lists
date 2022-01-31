import { IsBoolean, IsString, MaxLength } from 'class-validator';

export class CreateListDto {
  @IsString()
  @MaxLength(128, {
    message: 'Comment must be at most 128 characters',
  })
  title: string;
}
