export class ApiError extends Error {
  public static fromError(error: Error): ApiError {
    const apiError = new ApiError();

    apiError.name = 'ApiError';
    apiError.message = error.message;
    apiError.stack = error.stack;

    return apiError;
  }
}
