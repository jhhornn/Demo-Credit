import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { validate } from '../utils/validator';


const validatorMiddleware = (schema: ObjectSchema) => 
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await validate(schema, req.body);
        next();
      } catch (err) {
        next(err);
      }
    };
  
  export default validatorMiddleware;
