import {useState} from 'react';
import axios from '../../configs/axios';

const usePostAPI = (url) => {
  const [posting, setPosting] = useState(true);

  async function postData(data) {
    try {
      const response = await axios.post(url, {data});
      setPosting(false);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return {posting, setPosting, postData};
};

export default usePostAPI;
