import { validateOrReject } from 'class-validator';
import { ApiError } from './ApiError';
import { apiLogger, logApiError } from '../Log/Logger';
import { BaseEntity } from 'typeorm';

export async function validateItem<Entity extends BaseEntity>(
  item: Entity,
): Promise<void> {
  try {
    await validateOrReject(item);
  } catch (err) {
    const apiError = ApiError.fromError(err as Error);

    apiLogger.error(`unable to validate the item: ${item.constructor.name}`, {
      item,
    });
    logApiError(apiError);
  }
}
