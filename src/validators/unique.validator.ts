import { ValidatorConstraint } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UniqueValidator } from './abstract-unique.validator';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class Unique extends UniqueValidator {
  constructor() {
    super();
  }
}
