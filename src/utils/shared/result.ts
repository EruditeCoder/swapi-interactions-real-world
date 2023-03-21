import { ApiError } from "./api-error";

export class Result<TSuccess, TError = ApiError> {
  isFailure: boolean;

  constructor(
    public readonly isSuccess: boolean,
    public readonly error?: TError,
    private readonly value?: TSuccess
  ) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      );
    }

    this.isFailure = !isSuccess;

    Object.freeze(this);
  }

  getValue(): TSuccess {
    if (!this.isSuccess) {
      throw new Error(
        `Can't get the value of an error result. Use 'errorValue' instead.`
      );
    }

    return this.value as TSuccess;
  }

  errorValue(): TError {
    return this.error as TError;
  }

  static ok<U = void, E = ApiError>(value?: U): Result<U, E> {
    return new Result<U, E>(true, undefined, value);
  }

  static fail<UError extends ApiError | Error>(
    error: UError
  ): Result<never, UError> {
    return new Result<never, UError>(false, error);
  }
}
