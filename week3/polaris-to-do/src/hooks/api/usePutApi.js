import {useState} from 'react';
import axios from '../../configs/axios';

const usePutAPI = () => {
  const [putting, setPutting] = useState(false);

  async function handlePutItem(url, idList) {
    setPutting(true);
    if (idList) {
      const response = await axios.delete(url, {data: idList});
      setPutting(false);
      return response;
    }
    const response = await axios.delete(url);
    setPutting(false);
    return response;
  }

  return {handlePutItem, putting, setPutting};
};

export default usePutAPI;
