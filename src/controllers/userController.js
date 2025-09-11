import { User } from "../models/index.js";
import { META_CODE } from "../utils/constants.js";
import { responseMessages } from "../utils/messages.js";
import {
  errorResponseWithoutData,
  internalServerErrorResponse,
  successResponseData,
} from "../utils/responses.js";
import { createUserValidation } from "../validations/roomValidations.js";

export const createUser = async (req, res) => {
  try {
    const reqParam = req.body;
    createUserValidation(reqParam, res, async (validate) => {
      if (validate) {
        const user = await User.findOne({
          username: reqParam.username,
        });

        if (user) {
          return errorResponseWithoutData(
            res,
            META_CODE.FAIL,
            responseMessages.USERNAME_ALREADY_EXIST
          );
        }

        const newUser = await User.create({
          username: reqParam.username,
        });
        return successResponseData(
          res,
          newUser,
          META_CODE.SUCCES,
          responseMessages.USER_CREATED
        );
      } else {
        return internalServerErrorResponse(res);
      }
    });
  } catch (error) {
    internalServerErrorResponse(res);
  }
};

export const getUser = async (req, res) => {
  const reqParam = req.body;
  const user = await User.findOne({
    username: reqParam.username,
  });
  return successResponseData(
    res,
    user,
    META_CODE.SUCCES,
    responseMessages.USER_FETCHED
  );
};
