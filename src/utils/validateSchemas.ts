import Joi, { ObjectSchema } from 'joi';

const registerSchema: ObjectSchema = Joi.object({
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

const loginSchema: ObjectSchema = Joi.object({
  identifier: Joi.alternatives()
    .try(
      Joi.string().email().messages({
        'string.email': 'Invalid email format',
      }),
      Joi.string().messages({
        'string.empty': 'Username or email is required',
      })
    )
    .required(),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required',
  }),
});

export { registerSchema, loginSchema };
