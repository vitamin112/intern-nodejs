import { Button, Modal, Stack, TextField } from "@shopify/polaris";
import { useState } from "react";

const ModalAdd = ({ todoes, setTodoes, isOpenModal, setIsOpenModal }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = (value) => {
    setTodoes([
      ...todoes,
      {
        todo: value,
        isComplete: false,
        id: Math.floor(Math.random() * 10000 + 0),
      },
    ]);
    setNewTodo("");
  };

  const modalFooterMakeup = () => {
    return (
      <Stack distribution="trailing">
        <Button onClick={() => setIsOpenModal(false)}>Cancel</Button>
        <Button
          primary
          onClick={() => {
            handleAdd(newTodo);
            setIsOpenModal(false);
          }}
        >
          Create
        </Button>
      </Stack>
    );
  };

  return (
    <Modal
      title={"Create a new todo"}
      open={isOpenModal}
      onClose={() => setIsOpenModal(false)}
      footer={modalFooterMakeup()}
    >
      <Modal.Section>
        <TextField
          value={newTodo}
          onChange={(value) => setNewTodo(value)}
        ></TextField>
      </Modal.Section>
    </Modal>
  );
};

export default ModalAdd;
