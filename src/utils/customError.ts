class ConflictError extends Error {
    statusCode: number;
    error: string;

    constructor(message: string) {
      super(message);
      this.statusCode = 409;
      this.error = 'Conflict';
    }
}

class UnAuthorizedError extends Error {
    statusCode: number;
    error: string;

    constructor(message: string) {
      super(message);
      this.statusCode = 401;
      this.error = 'Unauthorized';
    }
}

class NotFoundError extends Error {
    statusCode: number;
    error: string;

    constructor(message: string) {
      super(message);
      this.statusCode = 404;
      this.error = 'Not Found';
    }
}

class BadRequestError extends Error {
    statusCode: number;
    error: string;
  
    constructor(message: string) {
    super(message);
      this.statusCode = 400;
      this.error = 'Bad Request';
    }
}  


export default {
    ConflictError,
    UnAuthorizedError,
    NotFoundError,
    BadRequestError,
};
