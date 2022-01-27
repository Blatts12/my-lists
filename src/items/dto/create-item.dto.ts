import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Validate,
} from 'class-validator';
import { Unique } from 'typeorm';
import { Item } from '../entities/item.entity';
import { ItemTypeEnum } from '../entities/type.entity';

export class CreateItemDto {
  @IsString()
  @MaxLength(256, {
    message: 'Title is too long',
  })
  @Validate(Unique, [Item], {
    message: 'Item with this title already exists',
  })
  title: string;

  @IsString()
  @MaxLength(2048, {
    message: 'Description is too long',
  })
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsEnum(ItemTypeEnum)
  type: string;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}
