import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Item } from 'src/items/entities/item.entity';
import { Status } from '../entities/status.entity';

export class CreateEntryDto {
  @IsNumber()
  @Max(100, {
    message: 'Maximum score is 100',
  })
  @Min(0, {
    message: 'Minimum score is 0',
  })
  score: number;

  @IsString()
  @MaxLength(512, {
    message: 'Comment must be at most 512 characters',
  })
  comment: string;

  @Type(() => Item)
  item: Item;

  @Type(() => Status)
  status: Status;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}
