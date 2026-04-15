import joi from "joi";
import { validationErrorResponseData } from "../utils/responses.js";

export const registerValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    phonenumber: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return validationErrorResponseData(res, error.details[0].message);
  }
  next();
};

export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return validationErrorResponseData(res, error.details[0].message);
  }
  next();
};

export const forgotPasswordValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return validationErrorResponseData(res, error.details[0].message);
  }
  next();
};
