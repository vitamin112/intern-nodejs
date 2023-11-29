import {Modal} from '@shopify/polaris';
import {useState} from 'react';

export default function useModal({
  content = '',
  title = '',
  primaryAction = () => {},
}) {
  const [open, setOpen] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setIsLoading(false);
  };

  const handlePrimaryAction = async () => {
    setIsLoading(true);
    await primaryAction();
    closeModal();
  };

  const modal = (
    <Modal
      title={title}
      open={open}
      primaryAction={{
        content: 'Create todo',
        onAction: async () => handlePrimaryAction(),
        loading: isLoading,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => {},
        },
      ]}
      onClose={() => closeModal()}
    >
      {content}
    </Modal>
  );

  return {modal, open, openModal, closeModal};
}
