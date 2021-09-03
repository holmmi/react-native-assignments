import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  username: {
    length: {
      minimum: 3,
      tooShort: 'needs to have %{count} letters or more.',
    },
    usernameExists: true,
  },
  password: {
    length: {
      minimum: 5,
      tooShort: 'needs to have %{count} letters or more.',
    },
  },
  email: {
    email: {
      message: 'is invalid.',
    },
  },
  full_name: {
    presence: {
      allowEmpty: true,
    },
  },
};

const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    email: '',
    full_name: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = async (field) => {
    const clonedConstraints = JSON.parse(JSON.stringify(constraints));
    clonedConstraints['passwordCheck'] = {
      passwordsMatch: {
        firstPassword: inputs.password,
      },
    };
    const validationResult = await validator(
      field,
      inputs[field],
      clonedConstraints
    );
    setFormErrors((formErrors) => {
      return {
        ...formErrors,
        [field]: validationResult,
      };
    });
    return validationResult !== null;
  };

  const validateAllFields = async () => {
    const fields = Object.keys(inputs);
    return await Promise.all(
      fields.map(async (field) => {
        return await validateForm(field);
      })
    );
  };

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };
  return {
    handleInputChange,
    validateForm,
    validateAllFields,
    inputs,
    formErrors,
  };
};

export default useSignUpForm;
