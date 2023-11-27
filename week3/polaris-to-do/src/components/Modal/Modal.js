import { Button, Modal, Stack, TextField } from "@shopify/polaris";
import { useState } from "react";

const ModalAdd = ({ item, setItem, cb }) => {
  const [value, setValue] = useState("");

  return (
    <>
      <Modal.Section>
        <TextField
          value={value}
          onChange={(value) => setValue(value)}
        ></TextField>
      </Modal.Section>
      <Modal.Section>
        <Stack distribution="trailing">
          <Button onClick={() => cb(false)}>Cancel</Button>
          <Button
            primary
            onClick={() => {
              setItem([...item, { todo: value, isComplete: false }]);
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
