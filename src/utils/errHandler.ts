import { Request, Response, NextFunction } from 'express';
import { CustomError } from './interfaces';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError: CustomError = {
    msg: err.message || 'Something went wrong',
    statusCode: err.statusCode || 500,
    error: err.error || 'Something went wrong!',
  };

  if (err.code === 'ER_BAD_FIELD_ERROR' || err.code === 'ER_NO_SUCH_TABLE') {
    customError.msg = 'Not Found';
    customError.statusCode = 404;
  }

  if (err.code === 'ER_DUP_ENTRY') {
    customError.statusCode = 409;
    customError.msg = 'Duplicate entry';
    customError.error = 'Conflict';
  }

  if (err.name === 'ValidationError') {
    customError.msg = err.errors
      ? Object.values(err.errors)
          .map((item: any) => item.message)
          .join('. ')
      : err.details.map((item: any) => item.message).join('. ');
    customError.statusCode = 422;
    customError.error = 'Validation Error';
  }

  if (err.code === 'ENOENT') {
    customError.msg = 'Please contact the server administrator!';
  }

  res.status(customError.statusCode).json({
    statusCode: customError.statusCode,
    message: customError.msg,
    error: customError.error,
  });

  next();
};

export default errorHandler;
