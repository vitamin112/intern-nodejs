import {Button, Modal, Stack, TextField} from '@shopify/polaris';
import {useState} from 'react';

const ModalAdd = ({item, setItem, cb}) => {
  const [fieldValue, setFieldValue] = useState('');

  const ramdomID = () => {
    return Math.floor(Math.random() * 10000);
  };

  const handleOnClick = () => {
    setItem([...item, {id: ramdomID(), todo: fieldValue, isComplete: false}]);
    cb(false);
  };

  return (
    <>
      <Modal.Section>
        <TextField
          value={fieldValue}
          onChange={(fieldValue) => setFieldValue(fieldValue)}
        ></TextField>
      </Modal.Section>
      <Modal.Section>
        <Stack distribution='trailing'>
          <Button onClick={() => cb(false)}>Cancel</Button>
          <Button primary onClick={handleOnClick}>
            Create
          </Button>
        </Stack>
      </Modal.Section>
    </>
  );
};

export default ModalAdd;
