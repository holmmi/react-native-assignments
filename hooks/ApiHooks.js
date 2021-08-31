import {useEffect, useState} from 'react';

const apiUrl = 'https://media.mw.metropolia.fi/wbma';

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(`${apiUrl}/media`);
        const json = await response.json();
        const images = json.filter((item) => item.media_type === 'image');
        Promise.all(
          images.map(async (image) => {
            const imageResponse = await fetch(
              `${apiUrl}/media/${image.file_id}`
            );
            return await imageResponse.json();
          })
        ).then((details) => setMediaArray(details));
      } catch (error) {
        throw error;
      }
    };
    loadMedia();
  }, []);
  return mediaArray;
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

export {useLoadMedia, apiLogIn, getUserDetails, register, getUserAvatar};
