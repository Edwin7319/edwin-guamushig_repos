import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseAppEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date = new Date();

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date = new Date();
}
