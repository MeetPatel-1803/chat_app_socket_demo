/**
 * @description This function use for create validation unique key
 * @param apiTag
 * @param error
 * @returns {*}
 */
export const validationMessageKey = (apiTag, error) => {
  let key = toUpperCase(
    error.details[0].context.key || error.details[0].context.label
  );
  let type = error.details[0].type.split(".");
  type = toUpperCase(type[1]);
  key = apiTag + key + type;
  return key;
};
