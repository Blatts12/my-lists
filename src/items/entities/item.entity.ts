import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ItemType } from './type.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 256,
  })
  title: string;

  @Column({
    length: 2048,
  })
  description: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => ItemType, {
    eager: true,
  })
  type: ItemType;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
