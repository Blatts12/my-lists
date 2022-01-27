import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItemType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;
}

export enum ItemTypeEnum {
  MOVIE,
  SERIES,
  ANIME_MOVIE,
  ANIME_SERIES,
  MANGA,
  BOOK,
  ART,
  LIGHT_NOVEL,
}
