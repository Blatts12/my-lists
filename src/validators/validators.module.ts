import { Module } from '@nestjs/common';
import { Unique } from './unique/unique.validator';

@Module({
  providers: [Unique],
})
export class ValidatorsModule {}
