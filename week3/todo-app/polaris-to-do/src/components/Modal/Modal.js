import {Modal, TextField} from '@shopify/polaris';

const ModalCreate = ({value, setValue}) => {
  return (
    <Modal.Section>
      <TextField
        value={value}
        onChange={(value) => setValue(value)}
      ></TextField>
    </Modal.Section>
  );
};

export default ModalCreate;
