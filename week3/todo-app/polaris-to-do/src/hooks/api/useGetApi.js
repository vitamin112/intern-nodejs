import {useEffect, useState} from 'react';
import axios from '../../configs/axios';

export default function useGetAPI(url) {
  const [getting, setGetting] = useState(false);
  const [data, setData] = useState([]);

  async function getData() {
    setGetting(true);
    try {
      const response = await axios.get(url);

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
    setGetting(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return {data, setData, getting, setGetting};
}
