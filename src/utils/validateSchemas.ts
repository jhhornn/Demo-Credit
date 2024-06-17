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

const transactionSchema: ObjectSchema = Joi.object({
  toWalletId: Joi.string().length(10).regex(/^\d+$/).messages({
    'string.base': 'toWalletId must be a string',
    'string.length': 'toWalletId must be exactly 10 digits',
    'string.pattern.base': 'toWalletId must contain only digits',
  }),
  amount: Joi.number().positive().required().messages({
    'number.base': 'amount must be a number',
    'number.positive': 'amount must be a positive number',
    'any.required': 'amount is required',
  }),
}).or('toWalletId', 'amount');

export { registerSchema, loginSchema, transactionSchema };
