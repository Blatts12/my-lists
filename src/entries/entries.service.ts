import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';
import { Status } from './entities/status.entity';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry) private entryRepository: Repository<Entry>,
    @InjectRepository(Status) private statusRepository: Repository<Status>,
  ) {}

  async create(createEntryDto: CreateEntryDto): Promise<Entry> {
    const newEntry = this.entryRepository.create({
      ...createEntryDto,
    });

    return this.entryRepository.save(newEntry);
  }

  async findAllStatuses(): Promise<Status[]> {
    return this.statusRepository.find();
  }

  async findAll(): Promise<Entry[]> {
    return this.entryRepository.find();
  }

  async findOneById(id: number): Promise<Entry | undefined> {
    return this.entryRepository.findOne(id);
  }

  async update(id: number, updateEntryDto: UpdateEntryDto): Promise<Entry> {
    const oldEntry = this.findOneById(id);

    return this.entryRepository.save({
      ...oldEntry,
      ...updateEntryDto,
    });
  }

  async remove(id: number) {
    return this.entryRepository.delete(id);
  }
}
