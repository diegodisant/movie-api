import { BaseEntity } from 'typeorm';

export interface IBaseRepository<Entity extends BaseEntity> {
  all(): Promise<Entity[]>;
  one(id: number): Promise<Entity>;
  create(item: Entity): Promise<Entity>;
  update(id: number, item: Entity): Promise<Entity>;
  delete(id: number): Promise<boolean>;
}
