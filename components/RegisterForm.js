import React from 'react';
import {View, Alert} from 'react-native';
import useSignUpForm from '../hooks/RegisterHooks';
import {register} from '../hooks/ApiHooks';
import {Text, Input, Button} from 'react-native-elements';

const RegisterForm = () => {
  const {inputs, handleInputChange} = useSignUpForm();

  const doRegister = async () => {
    const serverResponse = await register(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);
    } else {
      Alert.alert('register failed');
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
      />
      <Input
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Input
        autoCapitalize="none"
        placeholder="E-mail"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <Input
        autoCapitalize="none"
        placeholder="Full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister} />
    </View>
  );
};

export default RegisterForm;
