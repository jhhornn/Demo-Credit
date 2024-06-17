import { ObjectSchema } from 'joi';

const validate = async (schema: ObjectSchema, payload: any) => {
  try {
    await schema.validateAsync(payload, { abortEarly: false });
  } catch (err) {
    throw err;
  }
};

export { validate };
