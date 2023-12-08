import {Button, Checkbox, Select, TextField} from '@shopify/polaris';
import React, {useCallback, useRef, useState} from 'react';
import useConfirmModal from '../../hooks/popup/useConfirmModal';

const CreateModal = () => {
  const employeeRef = useRef({
    email: '',
    fullName: '',
    role: '',
    status: '',
    avatar: '',
    englishName: ''
  });
  const [employee, setEmployee] = useState(employeeRef.current);
  const [selected, setSelected] = useState('member');
  const [checked, setChecked] = useState(false);

  const createUser = async userData => {
    console.log(userData);
  };

  const onInputChange = (value, key) => setEmployee(pre => ({...pre, [key]: value}));

  const handleCheck = useCallback(newChecked => setChecked(newChecked), []);

  const handleSelectChange = useCallback(value => setSelected(value), []);

  const options = [
    {label: 'Admin', value: 'admin'},
    {label: 'Member', value: 'member'},
    {label: 'Supper admin', value: 'supper_admin'}
  ];

  const modalContent = useCallback(
    ({input}) => (
      <>
        <TextField
          key="asdasjdkajsd"
          id="email"
          label="Email"
          value={employee.email}
          onChange={onInputChange}
        />
        <TextField
          id="fullName"
          label="Full name"
          value={employee.fullName}
          onChange={onInputChange}
        />
        <TextField
          id="englishName"
          label="English name"
          value={employee.englishName}
          onChange={onInputChange}
        />
        <TextField id="avatar" label="Avatar" value={employee.avatar} onChange={onInputChange} />
        <Select label="Role" options={options} onChange={handleSelectChange} value={selected} />
        <Checkbox label="Active" checked={checked} onChange={handleCheck} />
      </>
    ),
    []
  );

  const {modal, openModal} = useConfirmModal({
    title: 'Create New User',
    HtmlContent: modalContent,
    buttonTitle: 'Create',
    defaultCurrentInput: employee,
    confirmAction: createUser
  });

  return (
    <>
      <Button onClick={() => openModal(employee)}>Create</Button>
      {modal}
    </>
  );
};
export default CreateModal;
