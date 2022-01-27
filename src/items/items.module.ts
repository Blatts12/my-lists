import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemType } from './entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemType])],
  controllers: [ItemsController],
  exports: [ItemsService],
  providers: [ItemsService],
})
export class ItemsModule {}
