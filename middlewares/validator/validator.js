
import Joi from 'joi';

// Joi schema for signup validation
const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().min(5).max(20).required(),
  userName:Joi.string().min(5).max(20).required(),
  role: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6),
});

// Joi schema for login validation
const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Joi schema for signup validation
const editSchema = Joi.object({
  email: Joi.string().email().optional(),
  fullName: Joi.string().min(5).max(20).optional(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6),
});

// Middleware function for signup validation
export const validateSignUp = (req, res, next) => {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

// Middleware function for login validation
export const validateSignIn = (req, res, next) => {
  const { error } = signInSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};

// Middleware function for login validation
export const validateEdit = (req, res, next) => {
  const { error } = editSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  next();
};



const createPlaylistSchema = Joi.object({
  name: Joi.string().min(5).max(32).required(),
  description:Joi.string(),
});

export const validateCreatePlaylist = (req, res, next) => {
    const { error } = createPlaylistSchema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    next();
  };