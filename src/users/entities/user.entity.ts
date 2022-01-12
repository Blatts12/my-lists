import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { UserRole } from './role.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 64,
  })
  username: string;

  @Column({
    unique: true,
    length: 256,
  })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => UserRole)
  role: UserRole;

  @Column({
    default: true,
  })
  active: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  public static async comparePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }
}
