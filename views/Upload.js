import React, {useState, useContext} from 'react';
import {KeyboardAvoidingView, View, Alert, StyleSheet} from 'react-native';
import {Text, Input, Button, Image} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import useUploadForm from '../hooks/UploadHooks';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uploadFile} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const {
    uploadInputs,
    handleInputChange,
    resetForm,
    formErrors,
    validateForm,
    formValidated,
  } = useUploadForm();
  const [isLoading, setIsLoading] = useState(false);
  const {setRefreshImages} = useContext(MainContext);

  const selectFile = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
          await handleInputChange('file', {
            uri: result.uri,
            type: getFileMimeType(result.uri),
            name: getFileName(result.uri),
          });
        }
      }
    }
  };

  const getFileMimeType = (fileUri) => {
    if (fileUri.endsWith('.jpg')) {
      return 'image/jpeg';
    } else if (fileUri.endsWith('.png')) {
      return 'image/png';
    } else if (fileUri.endsWith('.gif')) {
      return 'image/gif';
    }
  };

  const getFileName = (fileUri) => {
    const regex =
      /\b[0-9A-F]{8}\b-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-\b[0-9A-F]{12}\b.jpg/;
    return regex.exec(fileUri)[0];
  };

  const doUpload = async () => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const uploadResult = await uploadFile(userToken, uploadInputs);
      if (!uploadResult) {
        Alert.alert(
          'There was an error while uploading. Please try again later.'
        );
      } else {
        setRefreshImages(true);
        resetForm();
        navigation.navigate('HomeTab');
      }
      setIsLoading(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text h2 style={styles.title}>
        Upload an image
      </Text>
      <Input
        placeholder="Title"
        autoCapitalize="none"
        value={uploadInputs.title}
        onChangeText={(text) => handleInputChange('title', text)}
        onEndEditing={() => validateForm('title')}
        errorMessage={formErrors['title']}
        errorStyle={{color: 'red'}}
      />
      <Input
        placeholder="Description"
        autoCapitalize="none"
        value={uploadInputs.description}
        onChangeText={(text) => handleInputChange('description', text)}
        onEndEditing={() => validateForm('description')}
        errorMessage={formErrors['description']}
        errorStyle={{color: 'red'}}
      />
      {uploadInputs.file && (
        <View style={styles.imagePreview}>
          <Image source={{uri: uploadInputs.file.uri}} style={styles.image} />
        </View>
      )}
      <View style={styles.buttons}>
        <Button title="Select a file" onPress={selectFile} />
        <Button
          title="Upload"
          onPress={doUpload}
          disabled={!formValidated || !uploadInputs.file}
          loading={isLoading}
        />
        <Button title="Reset form" onPress={resetForm} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttons: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imagePreview: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Upload;
