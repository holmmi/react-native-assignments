import {useState, useEffect} from 'react';
import {validator} from '../utils/validator';

const formInitialState = {
  title: '',
  description: '',
  file: null,
};

const constraints = {
  title: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 5,
    },
  },
  description: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 10,
    },
  },
};

const useUploadForm = () => {
  const [uploadInputs, setUploadInputs] = useState(formInitialState);
  const [formErrors, setFormErrors] = useState({});
  const [formValidated, setFormValidated] = useState(false);

  useEffect(() => {
    const uploadInputFields = Object.keys(uploadInputs);
    setFormValidated(
      uploadInputFields
        .filter((field) => field !== 'file')
        .every((field) => formErrors[field] === null)
    );
  }, [formErrors]);

  const handleInputChange = async (field, value) => {
    setUploadInputs((uploadInputs) => {
      return {
        ...uploadInputs,
        [field]: value,
      };
    });
  };

  const validateForm = async (field) => {
    const validationResult = await validator(
      field,
      uploadInputs[field],
      constraints
    );
    setFormErrors((formErrors) => {
      return {
        ...formErrors,
        [field]: validationResult,
      };
    });
  };

  const resetForm = () => {
    setFormErrors({});
    setUploadInputs({...formInitialState});
  };

  return {
    uploadInputs,
    setUploadInputs,
    handleInputChange,
    resetForm,
    formErrors,
    setFormErrors,
    validateForm,
    formValidated,
    setFormValidated,
  };
};

export default useUploadForm;
