import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { UserRole } from './role.entity';
import { List } from 'src/lists/entities/list.entity';

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

  @ManyToOne(() => UserRole, {
    eager: true,
  })
  role: UserRole;

  @OneToMany(() => List, (list) => list.user)
  lists: List[];

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
