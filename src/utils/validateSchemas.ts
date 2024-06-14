import Joi, { ObjectSchema } from 'joi';

const userSchema: ObjectSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  username: Joi.string().required().messages({
    'string.empty': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email is invalid',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required',
  }),
});

export { userSchema };
