import React, {useEffect, useContext} from 'react';
import {KeyboardAvoidingView, View, Alert, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import {updateFile} from '../hooks/ApiHooks';
import useUploadForm from '../hooks/UploadHooks';

const Modify = ({navigation, route}) => {
  const {media} = route.params;

  const {setRefreshImages} = useContext(MainContext);

  const {
    uploadInputs,
    setUploadInputs,
    handleInputChange,
    validateForm,
    formErrors,
    setFormErrors,
    formValidated,
  } = useUploadForm();

  useEffect(() => {
    setUploadInputs((uploadInputs) => {
      return {
        ...uploadInputs,
        title: media.title,
        description: media.description,
      };
    });
    setFormErrors((formErrors) => {
      return {
        ...formErrors,
        title: null,
        description: null,
      };
    });
  }, [media]);

  const updateFileInformation = async () => {
    const updateSucceed = await updateFile(media.file_id, {
      title: uploadInputs.title,
      description: uploadInputs.description,
    });
    if (updateSucceed) {
      setRefreshImages(true);
      navigation.goBack();
    } else {
      Alert.alert('Could not update file information. Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text h2 style={styles.title}>
        Update media file information
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
      <View style={styles.buttons}>
        <Button
          title="Update"
          onPress={updateFileInformation}
          disabled={!formValidated}
        />
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

export default Modify;
