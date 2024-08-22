import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  teachingSkills: Joi.array().items(Joi.string()).required(),
  experience: Joi.string().required(),
  description: Joi.string().allow(''),
  location: Joi.string().required(),
  avatar: Joi.string().allow(null, ''),
});

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
