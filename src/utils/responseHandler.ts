import { Response } from 'express';

class ResponseHandler {
  private data: any;
  private message: string;
  private meta: any | null;

  constructor(res: Response, data: any, statusCode: number, message: string, meta: any = null) {
    this.data = data;
    this.message = message;
    this.meta = meta;

    res.status(statusCode).json({
      statusCode,
      message,
      data: this.data,
      ...(this.meta && { meta: this.meta }),
    });
  }
}

export default ResponseHandler;
