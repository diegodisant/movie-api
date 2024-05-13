import { BaseEntity } from "typeorm";
import { IBaseRepository } from "../repository/BaseRepository";

export interface IBaseService<Entity extends BaseEntity> {
  getAll(): Promise<Entity[]>;
  getOne(id: number): Promise<Entity>;
  add(item: Entity): Promise<Entity>;
  edit(id: number, item: Entity): Promise<Entity>;
  remove(id: number): Promise<boolean>;
}

export abstract class BaseService<Entity extends BaseEntity> implements IBaseService<Entity> {
  constructor(protected repository: IBaseRepository<Entity>) {}

  async getAll(): Promise<Entity[]> {
    return await this.repository.all();
  }

  async getOne(id: number): Promise<Entity> {
    return await this.repository.one(id);
  }

  async add(item: Entity): Promise<Entity> {
    return await this.repository.create(item);
  }

  async edit(id: number, item: Entity): Promise<Entity> {
    return await this.repository.update(id, item);
  }

  async remove(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
