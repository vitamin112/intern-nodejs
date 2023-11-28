import {Button, Modal, Stack, TextField} from '@shopify/polaris';
import {useState} from 'react';
import axios from '../../configs/axios';

const ModalAdd = ({item, setItem, cb}) => {
  const [value, setValue] = useState('');

  const handleCreate = async (todo) => {
    const newTodo = await axios.post('/api/todo', {todo});
    setItem([...item, newTodo.data]);
  };

  return (
    <>
      <Modal.Section>
        <TextField
          value={value}
          onChange={(value) => setValue(value)}
        ></TextField>
      </Modal.Section>
      <Modal.Section>
        <Stack distribution='trailing'>
          <Button onClick={() => cb(false)}>Cancel</Button>
          <Button
            primary
            onClick={() => {
              handleCreate(value);
              cb(false);
            }}
          >
            Create
          </Button>
        </Stack>
      </Modal.Section>
    </>
  );
};

export default ModalAdd;
