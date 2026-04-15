import joi from "joi";
import { validationErrorResponseData } from "../utils/responses.js";
import { validationMessageKey } from "../utils/helper.js";

export const addUserValidation = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().max(25).required(),
  });
  const { error } = schema.validate(req);
  if (error) {
    return validationErrorResponseData(
      res,
      validationMessageKey("addUserValidation", error),
    );
  }
  next();
};
