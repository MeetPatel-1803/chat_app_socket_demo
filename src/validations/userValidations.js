import joi from "joi";
import { ROOM_TYPE } from "../utils/constants";
import { validationErrorResponseData } from "../utils/responses";
import { validationMessageKey } from "../utils/helper";

export const createRoomValidation = (req, res, callback) => {
  const schema = joi.object({
    name: joi.string().max(50).required(),
    type: joi.valid(...Object.values(ROOM_TYPE)),
  });
  const { error } = schema.validate(req);
  if (error) {
    return validationErrorResponseData(
      res,
      res.__(validationMessageKey("createRoomValidation", error))
    );
  }
  return callback(true);
};
