import joi from "joi";

export const validatePrivateMessage = (data) => {
  const schema = joi.object({
    receiverId: joi.number().required(),
    message: joi.string().trim().min(1).required(),
  });

  const { error } = schema.validate(data);
  if (error) {
    return error.details[0].message;
  }
  return null;
};
