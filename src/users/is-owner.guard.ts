import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRepository } from 'typeorm';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const entityName = this.reflector.get<string>(
      'entityName',
      context.getClass(),
    );
    const request = context.switchToHttp().getRequest();
    const {
      user,
      params: { id },
    } = request;

    const result = await getRepository(entityName).findOne(id, {
      where: {
        user,
      },
    });

    return Boolean(result);
  }
}

export const EntityName = (entityName: string) =>
  SetMetadata('entityName', entityName);
