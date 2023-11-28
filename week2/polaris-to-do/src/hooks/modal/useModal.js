import {Modal} from '@shopify/polaris';

export default function useModal({
  content = '',
  title = '',
  open = false,
  setOpen = () => {},
}) {
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const modal = (
    <Modal title={title} open={open} onClose={() => setOpen(false)}>
      {content}
    </Modal>
  );

  return {modal, open, openModal, closeModal};
}
