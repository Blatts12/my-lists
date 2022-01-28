// https://gist.github.com/zarv1k/3ce359af1a3b2a7f1d99b4f66a17f1bc
import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  EntitySchema,
  FindConditions,
  getRepository,
  ObjectType,
} from 'typeorm';

interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<E> | string,
    ((validationArguments: ValidationArguments) => FindConditions<E>) | keyof E,
  ];
}

export abstract class UniqueValidator implements ValidatorConstraintInterface {
  protected constructor() {}

  public async validate<E>(value: string, args: UniqueValidationArguments<E>) {
    const [EntityClass, findCondition = args.property] = args.constraints;
    return (
      (await getRepository(EntityClass).count({
        where:
          typeof findCondition === 'function'
            ? findCondition(args)
            : {
                [findCondition || args.property]: value,
              },
      })) <= 0
    );
  }

  public defaultMessage(args: ValidationArguments) {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';
    return `${entity} with the same '${args.property}' already exist`;
  }
}
