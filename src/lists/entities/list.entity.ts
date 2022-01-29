import { Entry } from 'src/entries/entities/entry.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique('unique_list', ['title', 'user'])
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 128,
  })
  title: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Entry, (entry) => entry.list)
  entries: Entry[];
}
