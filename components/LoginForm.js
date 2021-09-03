import React, {useContext} from 'react';
import {View, Alert} from 'react-native';
import useLoginForm from '../hooks/LoginHooks';
import {apiLogIn} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types';

const LoginForm = ({switchForms}) => {
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
      <Text h2 style={{textAlign: 'center', fontWeight: 'bold'}}>
        Login
      </Text>
      <Input
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <Input
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="Login!" onPress={doLogin} />
      <Button
        title="No account yet?"
        type="clear"
        onPress={switchForms}
        style={{paddingTop: 10}}
      />
    </View>
  );
};

LoginForm.propTypes = {
  switchForms: PropTypes.func,
};

export default LoginForm;
