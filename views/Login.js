import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetails} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const userDetails = await getUserDetails(userToken);
        if (userDetails) {
          setIsLoggedIn(true);
          setUser(userDetails);
        }
      }
    };
    getToken();
  }, []);

  const switchForms = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {isRegistering ? (
        <RegisterForm navigation={navigation} switchForms={switchForms} />
      ) : (
        <LoginForm navigation={navigation} switchForms={switchForms} />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
