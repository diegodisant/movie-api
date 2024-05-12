import express from 'express';
import { BaseEntity } from "typeorm";
import { BaseController } from "../controller/BaseController";

export interface IBaseRouter {
  mount(): express.Router;

  bind(api: express.Express): void;
}

export abstract class BaseRouter<Entity extends BaseEntity> implements IBaseRouter {
  abstract name: string;

  private controller: BaseController<Entity>;

  constructor(controller: BaseController<Entity>) {
    this.controller = controller;
  }

  mount(): express.Router {
    const router = express.Router();

    router.get('/', this.controller.all);
    router.get('/:id', this.controller.one);
    router.post('/', this.controller.create);
    router.patch('/', this.controller.update);
    router.delete('/:id', this.controller.delete);

    return router;
  }

  bind(api: express.Express): void {
    api.use(`/${this.name}`, this.mount());
  }
}
