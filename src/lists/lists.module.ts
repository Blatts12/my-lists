import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  controllers: [ListsController],
  exports: [ListsService],
  providers: [ListsService],
})
export class ListsModule {}
