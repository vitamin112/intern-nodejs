import useToast from '../../hooks/toast/useToast';

const CustomToast = () => {
  const {toast, toggleToast} = useToast({message: 'custom toast'});

  return toast;
};

export default CustomToast;
