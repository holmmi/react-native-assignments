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

export {useLoadMedia};
