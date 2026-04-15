export const USER_STATUS = {
  OFFLINE: 0,
  ONLINE: 1,
};

export const META_CODE = {
  SUCCES: 1,
  FAIL: 0,
};

export const JWT_SECRET = process.env.JWT_SECRET || "SUPER_SECRET_KEY_123456";
export const JWT_EXPIRES_IN = "1d";
