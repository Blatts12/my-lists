import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Status } from './entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry, Status])],
  controllers: [EntriesController],
  exports: [EntriesService],
  providers: [EntriesService],
})
export class EntriesModule {}
