export class ApiError extends Error {
  constructor(public code: number, message: string) {
    super(message);
  }

  toJSON() {
    return { code: this.code, message: this.message };
  }
}
