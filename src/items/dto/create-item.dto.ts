import { Type } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Validate,
} from 'class-validator';
import { Unique } from 'src/validators/unique/unique.validator';
import { Item } from '../entities/item.entity';
import { ItemType } from '../entities/type.entity';

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

  @Type(() => ItemType)
  type: ItemType;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}
