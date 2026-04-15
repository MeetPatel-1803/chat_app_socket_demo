import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../utils/constants.js";
import User from "../models/User.js";

/**
 * Issue a new JWT token for a user
 * @param {Object} payload - Data to encode (e.g., userId)
 * @returns {String} JWT Token
 */
export const issueJwtToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verify a token and return the user if valid
 * @param {String} token - JWT Token
 * @returns {Promise<Object>} User object if token is valid
 */
export const verifyUser = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.id) {
      throw new Error("Invalid token payload");
    }
    const user = await User.findByPk(decoded.id);
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Decode a token without verifying signature (useful for checking expiration or contents)
 * @param {String} token - JWT Token
 * @returns {Object} Decoded payload
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};
