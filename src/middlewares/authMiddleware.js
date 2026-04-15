import { verifyUser } from "../services/authService.js";
import { responseMessages } from "../utils/messages.js";
import { META_CODE } from "../utils/constants.js";
import { errorResponseWithoutData } from "../utils/responses.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponseWithoutData(
        res,
        401,
        responseMessages.TOKEN_NOT_FOUND,
        META_CODE.FAIL
      );
    }

    const token = authHeader.split(" ")[1];
    const user = await verifyUser(token);

    if (!user) {
      return errorResponseWithoutData(
        res,
        401,
        responseMessages.UNAUTHORIZED,
        META_CODE.FAIL
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponseWithoutData(
      res,
      401,
      responseMessages.INVALID_TOKEN,
      META_CODE.FAIL
    );
  }
};

