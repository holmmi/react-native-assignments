import {useEffect, useState, useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import tags from '../constants/tags';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = 'https://media.mw.metropolia.fi/wbma';
const {UNIQUE_TAG} = tags;

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState(null);
  const {refreshImages, setRefreshImages} = useContext(MainContext);

  useEffect(() => {
    if (refreshImages) {
      const loadMedia = async () => {
        try {
          const response = await fetch(`${apiUrl}/tags/${UNIQUE_TAG}`);
          const json = await response.json();
          const images = json.filter(
            (item) => item.media_type === 'image' || item.media_type === 'video'
          );
          const details = await Promise.all(
            images.map(async (image) => {
              const imageResponse = await fetch(
                `${apiUrl}/media/${image.file_id}`
              );
              return await imageResponse.json();
            })
          );
          setMediaArray(details);
        } catch (error) {
          throw error;
        }
      };
      setTimeout(() => {
        loadMedia();
        setRefreshImages(false);
      }, 1000);
    }
  }, [refreshImages]);
  return mediaArray;
};

const useMyMedia = () => {
  const [media, setMedia] = useState(null);
  const {refreshImages, setRefreshImages} = useContext(MainContext);

  const loadUserMedia = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${apiUrl}/media/user`, {
        headers: {
          'x-access-token': userToken,
        },
      });
      if (response.ok) {
        const json = await response.json();
        const files = json.filter(
          (item) => item.media_type === 'image' || item.media_type === 'video'
        );
        const details = await Promise.all(
          files.map(async (file) => {
            const fileResponse = await fetch(`${apiUrl}/media/${file.file_id}`);
            return await fileResponse.json();
          })
        );
        setMedia(details);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadUserMedia();
  }, []);

  useEffect(() => {
    if (refreshImages) {
      loadUserMedia();
      setRefreshImages(false);
    }
  }, [refreshImages]);

  return media;
};

const apiLogIn = async (inputs) => {
  try {
    let userDetails;
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (response.ok) {
      userDetails = await response.json();
    }
    return userDetails;
  } catch (error) {
    throw error;
  }
};

const getUserDetails = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/users/user`, {
      headers: {'x-access-token': token},
    });
    if (response.ok) {
      return response.json();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const register = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(`${apiUrl}/users`, fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    return false;
  }
};

const getUserAvatar = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/tags/avatar_${userId}`);
    let avatar;
    if (response.ok) {
      const userMedia = await response.json();
      if (userMedia.length > 0) {
        avatar = userMedia[0].filename;
      }
    }
    return avatar;
  } catch (error) {
    throw error;
  }
};

const checkIfUsernameExists = async (username) => {
  try {
    const response = await fetch(`${apiUrl}/users/username/${username}`);
    if (response.ok) {
      const json = await response.json();
      return json.available;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const uploadFile = async (token, uploadInputs) => {
  const formData = new FormData();
  const keys = Object.keys(uploadInputs);
  keys.forEach((key) => formData.append(key, uploadInputs[key]));
  try {
    const response = await fetch(`${apiUrl}/media`, {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    if (response.ok) {
      const json = await response.json();
      const tagResponse = await fetch(`${apiUrl}/tags`, {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_id: json.file_id,
          tag: UNIQUE_TAG,
        }),
      });
      return tagResponse.ok;
    }
    return response.ok;
  } catch (error) {
    throw error;
  }
};

const getUserInformation = async (token, userId) => {
  try {
    const response = await fetch(`${apiUrl}/users/${userId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const deleteFile = async (fileId) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${apiUrl}/media/${fileId}`, {
      headers: {
        'x-access-token': userToken,
      },
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    throw error;
  }
};

const updateFile = async (fileId, inputs) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${apiUrl}/media/${fileId}`, {
      headers: {
        'x-access-token': userToken,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(inputs),
    });
    return response.ok;
  } catch (error) {
    throw error;
  }
};

export {
  useLoadMedia,
  useMyMedia,
  apiLogIn,
  getUserDetails,
  register,
  getUserAvatar,
  checkIfUsernameExists,
  uploadFile,
  getUserInformation,
  deleteFile,
  updateFile,
};
