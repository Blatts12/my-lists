import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { ItemType } from './entities/type.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(ItemType) private typeRepository: Repository<ItemType>,
  ) {}

  async findAllTypes(): Promise<ItemType[]> {
    return this.typeRepository.find();
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create({
      ...createItemDto,
    });

    return this.itemRepository.save(newItem);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findOneById(id: number): Promise<Item | undefined> {
    return this.itemRepository.findOne(id);
  }

  async findOneByTitle(title: string): Promise<Item | undefined> {
    return this.itemRepository.findOne({
      title,
    });
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
  ): Promise<Item | undefined> {
    const oldItem = await this.findOneById(id);

    return this.itemRepository.save({
      ...oldItem,
      ...updateItemDto,
    });
  }

  async remove(id: number) {
    return this.itemRepository.delete({
      id,
    });
  }
}
