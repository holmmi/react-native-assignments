import React, {useContext} from 'react';
import {View, Button, Alert} from 'react-native';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import {apiLogIn} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({navigation}) => {
  const {inputs, handleInputChange} = useLoginForm();
  const {setIsLoggedIn, setUser} = useContext(MainContext);

  const doLogin = async () => {
    const userDetails = await apiLogIn(inputs);
    if (userDetails) {
      Alert.alert(userDetails.message);
      setIsLoggedIn(true);
      setUser(userDetails);
      await AsyncStorage.setItem('userToken', userDetails.token);
    } else {
      Alert.alert('login failed');
    }
  };

  return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="Login!" onPress={doLogin} />
    </View>
  );
};

export default LoginForm;
