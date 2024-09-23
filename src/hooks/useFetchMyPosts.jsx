import { useState, useEffect } from 'react';
import { getData } from '../api/Functions';

const useFetchMyPosts = (url, boardType, token, params, currentMode) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await getData(
          url,
          { Authorization: `Bearer ${token}` },
          params,
        );
        if (response) {
          console.log(boardType + ': ' + response.data);
          setPosts(response.data.content);
        }
      } catch (error) {
        console.error('Error fetching data:', boardType, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentMode]);

  return { posts, isLoading };
};

export default useFetchMyPosts;
