import { Item } from 'src/items/entities/item.entity';
import { List } from 'src/lists/entities/list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './status.entity';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @ManyToOne(() => Item, {
    eager: true,
  })
  item: Item;

  @Column({
    length: 512,
  })
  comment: string;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status;

  @Column()
  list_id: number;

  @ManyToOne(() => List)
  @JoinColumn({ name: 'list_id', referencedColumnName: 'id' })
  list: List;

  @Column({
    nullable: true,
  })
  startDate: Date;

  @Column({
    nullable: true,
  })
  endDate: Date;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
