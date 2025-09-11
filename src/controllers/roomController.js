import { Room } from "../models/index.js";
import { META_CODE } from "../utils/constants.js";
import { responseMessages } from "../utils/messages.js";
import {
  errorResponseWithoutData,
  internalServerErrorResponse,
  successResponseData,
} from "../utils/responses";
import { createRoomValidation } from "../validations/roomValidations";

export const createRoom = async (req, res) => {
  try {
    const reqParam = req.body;
    createRoomValidation(reqParam, res, async (validate) => {
      if (validate) {
        const room = await Room.findOne({
          name: reqParam.name,
        });

        if (room) {
          return errorResponseWithoutData(
            res,
            META_CODE.FAIL,
            responseMessages.ROOM_NAME_ALREADY_EXIST
          );
        }

        const newRoom = await Room.create({
          name: reqParam.name,
          type: reqParam.type,
        });
        return successResponseData(
          res,
          room,
          META_CODE.SUCCES,
          responseMessages.ROOM_CREATED
        );
      } else {
        return internalServerErrorResponse(res);
      }
    });
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};
