import validate from 'validate.js';
import {checkIfUsernameExists} from '../hooks/ApiHooks';

validate.validators.usernameExists = async (
  value,
  options,
  key,
  attributes
) => {
  const result = await checkIfUsernameExists(value);
  return result ? null : 'is already taken.';
};

validate.validators.passwordsMatch = (value, options, key, attributes) => {
  if (options.firstPassword !== value) {
    return 'do not match.';
  }
  return null;
};

const validator = async (field, value, constraints) => {
  let object = {};
  if (typeof value === 'string') {
    object[field] = value;
  } else {
    object = value;
  }
  const constraint = constraints[field];
  try {
    await validate.async(object, {[field]: constraint});
    return null;
  } catch (error) {
    return error[field][0];
  }
};

export {validator};
