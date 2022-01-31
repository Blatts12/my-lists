import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  async create(createListDto: CreateListDto, user: User): Promise<List> {
    const newList = this.listRepository.create({ ...createListDto, user });
    return this.listRepository.save(newList);
  }

  async findOneById(id: number): Promise<List> {
    return await this.listRepository.findOne(id, {
      relations: ['entries'],
    });
  }

  async update(id: number, updateListDto: UpdateListDto): Promise<List> {
    const oldEntry = await this.findOneById(id);

    return this.listRepository.save({
      ...oldEntry,
      ...updateListDto,
    });
  }

  async remove(id: number) {
    return this.listRepository.delete(id);
  }
}
