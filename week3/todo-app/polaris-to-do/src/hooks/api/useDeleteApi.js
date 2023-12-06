import {useState} from 'react';
import axios from '../../configs/axios';

const useDeleteAPI = () => {
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteItem(url, idList) {
    setDeleting(true);
    if (idList) {
      const response = await axios.delete(url, {data: idList});
      setDeleting(false);
      return response;
    }
    const response = await axios.delete(url);
    setDeleting(false);
    return response;
  }

  return {handleDeleteItem, deleting, setDeleting};
};

export default useDeleteAPI;
