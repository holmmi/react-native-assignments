import React from 'react';
import {View, Alert} from 'react-native';
import useSignUpForm from '../hooks/RegisterHooks';
import {register} from '../hooks/ApiHooks';
import {Text, Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types';

const RegisterForm = ({switchForms}) => {
  const {
    inputs,
    formErrors,
    handleInputChange,
    validateForm,
    validateAllFields,
  } = useSignUpForm();

  const doRegister = async () => {
    const errornousFields = await validateAllFields();
    if (errornousFields.every((errornousField) => !errornousField)) {
      const serverResponse = await register(inputs);
      if (serverResponse) {
        Alert.alert(serverResponse.message);
      } else {
        Alert.alert('register failed');
      }
    }
  };

  return (
    <View>
      <Text h2 style={{textAlign: 'center', fontWeight: 'bold'}}>
        Register
      </Text>
      <Input
        autoCapitalize="none"
        placeholder="Username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={() => validateForm('username')}
        errorMessage={formErrors['username']}
        errorStyle={{color: 'red'}}
      />
      <Input
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        onEndEditing={() => validateForm('password')}
        errorMessage={formErrors['password']}
        errorStyle={{color: 'red'}}
        secureTextEntry={true}
      />
      <Input
        autoCapitalize="none"
        placeholder="Retype password"
        onChangeText={(txt) => handleInputChange('passwordCheck', txt)}
        onEndEditing={() => validateForm('passwordCheck')}
        errorMessage={formErrors['passwordCheck']}
        errorStyle={{color: 'red'}}
        secureTextEntry={true}
      />
      <Input
        autoCapitalize="none"
        placeholder="E-mail"
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={() => validateForm('email')}
        errorMessage={formErrors['email']}
        errorStyle={{color: 'red'}}
      />
      <Input
        autoCapitalize="none"
        placeholder="Full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={() => validateForm('full_name')}
        errorMessage={formErrors['full_name']}
        errorStyle={{color: 'red'}}
      />
      <Button title="Register!" onPress={doRegister} />
      <Button
        title="Already have an account?"
        type="clear"
        onPress={switchForms}
        style={{paddingTop: 10}}
      />
    </View>
  );
};

RegisterForm.propTypes = {
  switchForms: PropTypes.func,
};

export default RegisterForm;
