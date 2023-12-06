import {Toast} from '@shopify/polaris';
import {useCallback, useState} from 'react';

export default function useToast() {
  const [open, setOpen] = useState();
  const [type, setType] = useState('default');

  const [toatMessage, setToatMessage] = useState('Message sent');

  const showToast = useCallback(() => setOpen((open) => !open), []);

  const toast = open ? (
    <Toast content={toatMessage} onDismiss={showToast} />
  ) : null;

  return {toast, toatMessage, setToatMessage, showToast, type, setType};
}
