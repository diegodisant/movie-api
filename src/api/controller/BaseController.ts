import { BaseEntity } from 'typeorm';
import { Request, Response } from 'express'
import { BaseService } from '../../database/service/BaseService';
import { validateOrReject } from 'class-validator';
import { apiLogger, logApiError } from '../Log/Logger';
import { ApiError } from '../common/ApiError';
import { ApiResponse } from '../common/ApiResponse';

export interface IBaseController {
  all(req: Request, res: Response): void;
  one(req: Request, res: Response): void;
  create(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
}

export abstract class BaseController<Entity extends BaseEntity> implements IBaseController {
  constructor(private service: BaseService<Entity>) {}

  async all(req: Request, res: Response): Promise<void> {
    const items = await this.service.getAll();

    res.statusCode = 200;
    res.send(items);
    res.end();
  }

  async one(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.query.id as string);

    try {
      const item = await this.service.getOne(id);

      res.statusCode = 200;
      res.send(item);
    } catch (err) {
      const apiError = ApiError.fromError(err as Error);
      const errMessage = `unable to retrieve item with id: ${id}, cause does not exists`;
      const apiErrorResponse: ApiResponse = {
        message: errMessage,
        data: {
          error: apiError,
        },
      }

      logApiError(apiError);

      res.statusCode = 404;
      res.send(apiErrorResponse);
    }

    res.end();
  }

  async create(req: Request, res: Response): Promise<void> {
    const item = req.body as Entity;

    try {
      await this.validateItem(item);
      const itemCreated = await this.service.add(item);

      const apiResponse: ApiResponse = {
        message: `the item: ${item.constructor.name} was created successfully`,
        data: { itemCreated },
      };

      res.statusCode = 201;
      res.send(apiResponse);
    } catch (err) {
      const errMessage = `unable to create an item: ${item.constructor.name}`;
      const apiErrorResponse: ApiResponse = {
        message: errMessage,
        data: {
          error: err as Error,
        },
      };

      apiLogger.error(errMessage, { err });

      res.statusCode = 400;
      res.send(apiErrorResponse);
    }

    res.end();
  }

  async update(req: Request, res: Response): Promise<void> {
    const item = req.body as Entity;
    const id: number = parseInt(req.query.id as string);

    try {
      await this.validateItem(item);
      const itemUpdated = await this.service.edit(id, item);

      const apiResponse: ApiResponse = {
        message: `the item: ${item.constructor.name} was updated successfully`,
        data: { itemUpdated },
      };

      res.statusCode = 200;
      res.send(apiResponse);
    } catch (err) {
      const errMessage = `unable to update an item: ${ item.constructor.name }, with id: ${id}`;
      const apiErrorResponse: ApiResponse = {
        message: errMessage,
        data: {
          error: err as Error,
        },
      };

      apiLogger.error(errMessage, { err })

      res.statusCode = 400;
      res.send(apiErrorResponse);
    }

    res.end();
  }

  async delete(req: Request, res: Response):Promise<void> {
    let wasDeleted = false;
    const id: number = parseInt(req.query.id as string);

    try {
      wasDeleted = await this.service.remove(id);
    } catch (err) {
      const apiError = ApiError.fromError(err as Error);
      const errMessage = `unable to delete an item with id: ${id}, due to unexpected error`,
      const apiErrorResponse: ApiResponse = {
        message: errMessage,
        data: {
          error: apiError,
        }
      };

      logApiError(apiError);

      res.statusCode = 409;
      res.send(apiErrorResponse);
      res.end();

      return;
    }

    if (!wasDeleted) {
      const apiResponseError: ApiResponse = {
        message: `the item with id: ${id}, cannot be deleted`,
      };

      res.statusCode = 400;
      res.send(apiResponseError);
      res.end();

      return;
    }

    const apiResponse: ApiResponse = {
      message: `the item with id: ${id}, was created successfully`,
    };

    res.statusCode = 200;
    res.send(apiResponse);
    res.end();
  }

  private async validateItem(item: Entity): Promise<void> {
    try {
      await validateOrReject(item);
    } catch(err) {
      const apiError = ApiError.fromError(err as Error);

      apiLogger.error(`unable to validate the item: ${item.constructor.name}`, { item });
      logApiError(apiError);
    }
  }
}
