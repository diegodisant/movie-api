import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import {
 IsInt,
 IsString,
 IsArray,
 IsOptional,
 Length
} from 'class-validator';

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  @Length(1, 255)
  title: string;

  @Column()
  @IsString()
  @Length(1, 255)
  description: string;

  @Column({ type: 'char', length: 4, nullable: true })
  @IsString()
  @Length(4, 4)
  @IsOptional()
  release_year?: string;

  @Column({ type: 'text', array: true})
  @IsArray()
  actors: string[];

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
