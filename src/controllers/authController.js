import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import { issueJwtToken } from "../services/authService.js";
import {
  successResponseData,
  errorResponseWithoutData,
  internalServerErrorResponse,
} from "../utils/responses.js";
import { responseMessages } from "../utils/messages.js";
import { META_CODE, USER_STATUS } from "../utils/constants.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phonenumber } = req.body;

    const existingUser = await User.findOne({
      where: { email }, // Check by email, but we should probably check by phone number too.
    });

    if (existingUser) {
      return errorResponseWithoutData(
        res,
        400,
        responseMessages.EMAIL_OR_PHONE_ALREADY_EXIST,
        META_CODE.FAIL,
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phonenumber,
      status: USER_STATUS.ONLINE,
    });

    return successResponseData(
      res,
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phonenumber: newUser.phonenumber,
      },
      META_CODE.SUCCES,
      responseMessages.REGISTER_SUCCESS,
    );
  } catch (error) {
    console.error("Register Error:", error);
    return internalServerErrorResponse(res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return errorResponseWithoutData(
        res,
        404,
        responseMessages.USER_NOT_FOUND,
        META_CODE.FAIL,
      );
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return errorResponseWithoutData(
        res,
        400,
        responseMessages.INVALID_CREDENTIALS,
        META_CODE.FAIL,
      );
    }

    const token = issueJwtToken({ id: user.id });

    // Assuming user is online upon login
    await User.update(
      { status: USER_STATUS.ONLINE },
      { where: { id: user.id } },
    );

    return successResponseData(
      res,
      {
        id: user.id,
        name: user.name,
        email: user.email,
        phonenumber: user.phonenumber,
      },
      META_CODE.SUCCES,
      responseMessages.LOGIN_SUCCESS,
      { token },
    );
  } catch (error) {
    console.error("Login Error:", error);
    return internalServerErrorResponse(res);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return errorResponseWithoutData(
        res,
        404,
        responseMessages.USER_NOT_FOUND,
        META_CODE.FAIL,
      );
    }

    // Usually we generate a reset link and send via email. Here we just return success.
    // A token could also be generated and returned for demo purposes.
    const resetToken = issueJwtToken({ id: user.id });

    return successResponseData(
      res,
      { resetToken }, // Only for demo
      META_CODE.SUCCES,
      responseMessages.PASSWORD_RESET_SUCCESS,
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return internalServerErrorResponse(res);
  }
};
