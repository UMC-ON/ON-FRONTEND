import { useState, useEffect } from 'react';
import { getData } from '../api/Functions';

const useFetchChatList = (url, token, params, currentMode, type) => {
  const [chatList, setChatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChatList = async () => {
      setIsLoading(true);
      try {
        const response = await getData(
          url,
          { Authorization: `Bearer ${token}` },
          params,
        );
        if (response) {
          console.log(type, response.data.content[0]);
          if (response.data.content[0].roomCount == 0) {
            setChatList([]);
          } else {
            setChatList(response.data.content[0].roomList);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatList();
  }, [currentMode === type]);

  return { chatList, isLoading };
};

export default useFetchChatList;
