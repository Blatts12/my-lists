import { Module } from '@nestjs/common';
import { Unique } from './unique.validator';

@Module({
  providers: [Unique],
})
export class ValidatorsModule {}
