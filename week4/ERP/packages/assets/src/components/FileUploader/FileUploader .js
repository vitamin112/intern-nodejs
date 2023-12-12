import {setToast} from '@assets/actions/storeActions';
import {api} from '@assets/helpers';
import {useStore} from '@assets/reducers/storeReducer';
import {Button, Caption, DropZone, Stack, Thumbnail} from '@shopify/polaris';
import {ImportMinor, NoteMinor} from '@shopify/polaris-icons';
import Papa from 'papaparse';
import React, {useCallback, useRef, useState} from 'react';
import {object, string} from 'yup';
import useConfirmModal from '../../hooks/popup/useConfirmModal';

const FileUploader = ({setData}) => {
  const fileRef = useRef();
  const [file, setFile] = useState();
  const [importing, setImporting] = useState(false);
  const [isValidFile, setIsValidFile] = useState(false);
  const {dispatch} = useStore();

  const userSchema = object({
    fullName: string().required(),
    email: string().required(),
    englishName: string(),
    avatar: string(),
    role: string().matches(/(admin|member)/, {excludeEmptyString: true}),
    status: string()
  });

  const handleImportCSV = async file => {
    setImporting(true);
    return api({url: '/importfilecsv', method: 'POST', data: fileRef.current});
  };

  const handleDropZoneDrop = useCallback((_dropFiles, acceptedFiles, _rejectedFiles) => {
    try {
      Papa.parse(acceptedFiles[0], {
        delimiter: '',
        chunkSize: 3,
        header: true,
        skipEmptyLines: true,
        complete: async function(responses) {
          fileRef.current = responses.data;
        }
      });
      userSchema.validate(fileRef.current[0]);
      setIsValidFile(true);
    } catch (error) {
      setToast(dispatch, 'Check file format!', true);
    }
    return setFile(file => acceptedFiles[0]);
  }, []);

  const validImageTypes = ['csv', '.csv'];

  const fileUpload = !file && <DropZone.FileUpload />;
  const uploadedFile = file && (
    <Stack>
      <Thumbnail
        size="small"
        alt={file.name}
        source={validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteMinor}
      />
      <div>
        {file.name} <Caption>{file.size} bytes</Caption>
      </div>
    </Stack>
  );

  const {modal, openModal} = useConfirmModal({
    buttonTitle: 'Import',
    loading: importing,
    defaultCurrentInput: fileRef,
    disabled: !isValidFile,
    content: (
      <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
        {uploadedFile}
        {fileUpload}
      </DropZone>
    ),
    confirmAction: handleImportCSV,
    successCallback: response => {
      setImporting(false);
      if (response.success) {
        setData(prev => [...prev, ...response.data]);
        setToast(dispatch, response.message);
        return;
      }
      setToast(dispatch, response.error, true);
    }
  });

  return (
    <>
      {modal}
      <Button icon={ImportMinor} onClick={() => openModal()}>
        Import
      </Button>
    </>
  );
};

export default FileUploader;
