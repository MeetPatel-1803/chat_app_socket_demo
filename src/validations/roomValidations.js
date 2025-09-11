import joi from "joi";
import { validationErrorResponseData } from "../utils/responses.js";
import { validationMessageKey } from "../utils/helper.js";

export const createUserValidation = (req, res, callback) => {
  const schema = joi.object({
    username: joi.string().max(25).required(),
  });
  const { error } = schema.validate(req);
  if (error) {
    return validationErrorResponseData(
      res,
      res.__(validationMessageKey("createUserValidation", error))
    );
  }
  return callback(true);
};
