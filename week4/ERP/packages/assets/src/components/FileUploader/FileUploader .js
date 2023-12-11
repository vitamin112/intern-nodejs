import {setToast} from '@assets/actions/storeActions';
import {api} from '@assets/helpers';
import {useStore} from '@assets/reducers/storeReducer';
import Papa from 'papaparse';
import React from 'react';
import {object, string} from 'yup';

const FileUploader = ({setData}) => {
  const {dispatch} = useStore();
  let file = null;

  const userSchema = object({
    fullName: string().required(),
    email: string().required(),
    englishName: string(),
    avatar: string()
  });

  const handleImportFileCSV = async data => {
    const response = await api({
      url: 'https://localhost:3000/api/importfilecsv',
      data,
      method: 'POST'
    });
    setData(prev => [...prev, ...response.data]);
  };

  const handleReadCSV = async success => {
    try {
      await userSchema.validate(success.data[0]);
      await handleImportFileCSV(success.data);

      setToast(dispatch, 'DONE!');
    } catch (error) {
      console.log(error);
      setToast(dispatch, 'check your format!', true);
      return;
    }
  };

  const handleChange = ({target: {files}}) => {
    file = files[0];
  };

  const importCSV = () => {
    try {
      Papa.parse(file, {
        delimiter: '',
        header: true,
        skipEmptyLines: true,
        complete: handleReadCSV
      });
    } catch (error) {
      console.log(error);
      setToast(dispatch, 'Load file failed!', true);
    }
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      <button onClick={importCSV}>Click Me</button>
    </>
  );
};

export default FileUploader;
