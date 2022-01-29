import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './entities/role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserRole) private roleRepository: Repository<UserRole>,
  ) {}

  private async getRole(name: string): Promise<UserRole> {
    return this.roleRepository.findOne({ name });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...createUserDto,
      role: await this.getRole('user'),
    });

    return this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }
}
