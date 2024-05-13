import { Movie } from "../../database/entity/Movie";
import { MovieService } from "../../database/service/MovieService";
import {Request, Response } from 'express';
import { ApiError } from "../common/ApiError";
import { ApiResponse } from "../common/ApiResponse";
import { apiLogger, logApiError } from "../Log/Logger";
import { validateItem } from "../common/ValidateItem";

const service = new MovieService();

export async function all(req: Request, res: Response): Promise<void> {
  const items = await service.getAll();

  res.statusCode = 200;
  res.send(items);
  res.end();
}

export async function one(req: Request, res: Response): Promise<void> {
  const id: number = parseInt(req.params.id as string);

  try {
    const item = await service.getOne(id);

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

export async function create(req: Request, res: Response): Promise<void> {
  const item = req.body as Movie;

  try {
    await validateItem<Movie>(item);
    const itemCreated = await service.add(item);

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

export async function update(req: Request, res: Response): Promise<void> {
  const item = req.body as Movie;
  const id: number = parseInt(req.params.id as string);

  try {
    await validateItem<Movie>(item);
    const itemUpdated = await service.edit(id, item);

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

export async function remove(req: Request, res: Response): Promise<void> {
  let wasDeleted = false;
  const id: number = parseInt(req.params.id as string);

  try {
    wasDeleted = await service.remove(id);
  } catch (err) {
    const apiError = ApiError.fromError(err as Error);
    const errMessage = `unable to delete an item with id: ${id}, due to unexpected error`;
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
