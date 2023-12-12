import {
  Button,
  ButtonGroup,
  Checkbox,
  Layout,
  Page,
  Select,
  Spinner,
  TextField
} from '@shopify/polaris';
import {DeleteMajor, EditMinor} from '@shopify/polaris-icons';
import React, {useState} from 'react';
import FileUploader from '../../components/FileUploader/FileUploader ';
import useCreateApi from '../../hooks/api/useCreateApi';
import useDeleteApi from '../../hooks/api/useDeleteApi';
import useEditApi from '../../hooks/api/useEditApi';
import useConfirmModal from '../../hooks/popup/useConfirmModal';
import useTable from '../../hooks/table/useTable';

/**
 * Render a employees page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */

export default function Employees() {
  const initEmployee = {
    email: '',
    fullName: '',
    role: '',
    status: false,
    avatar: '',
    englishName: ''
  };
  const {creating, handleCreate} = useCreateApi({url: '/employees', fullResp: true});
  const {editing, handleEdit} = useEditApi({url: '/employees', fullResp: true});
  const {deleting, handleDelete} = useDeleteApi({url: '/employees'});
  const [inputs, setInputs] = useState(initEmployee);

  const [modalActionType, setModalActionType] = useState('');
  const {Table, setData, loading} = useTable({
    url: '/employees',
    columnContentTypes: ['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text'],
    headings: ['#', 'Avatar', 'Full name', 'English name', 'Email', 'Role', 'Status', ''],
    rowActions: [
      {
        icon: EditMinor,
        onAction: item => {
          openModal('UPDATE');
          setModalActionType('UPDATE');
          setInputs(item);
        }
      },
      {
        icon: DeleteMajor,
        destructive: true,
        onAction: item => {
          openModal('DELETE');
          setModalActionType('DELETE');
          setInputs(item.id);
        }
      }
    ]
  });

  const onInputChange = (value, key) => {
    setInputs(pre => ({...pre, [key]: value}));
  };

  const handelAction = (action, payload) => {
    if (action === 'CREATE') return handleCreate(payload);
    if (action === 'UPDATE') return handleEdit(payload);
    return handleDelete(payload);
  };

  const handleSuccess = result => {
    try {
      switch (modalActionType) {
        case 'CREATE':
          if (result.success) setData(prev => [...prev, result.data]);
          break;
        case 'UPDATE':
          if (result.success)
            setData(prev => prev.map(user => (user.id === result.data.id ? result.data : user)));
          break;
        default:
          setData(prev => prev.filter(employee => employee.id !== inputs));
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modalTitle = ({input}) => {
    switch (input.current) {
      case 'CREATE':
        return 'CREATE A NEW EMPLOYEE';
      case 'UPDATE':
        return 'UPDATE EMPLOYEE INFORMATION';
      default:
        return 'DELETE EMPLOYEE';
    }
  };

  const modalContent = (
    <>
      <TextField
        label="Email"
        requiredIndicator
        id="email"
        type="email"
        value={inputs.email}
        onChange={onInputChange}
      />

      <TextField
        label="Full name"
        requiredIndicator
        id="fullName"
        value={inputs.fullName}
        onChange={onInputChange}
      />
      <TextField
        label="English name"
        id="englishName"
        value={inputs.englishName}
        onChange={onInputChange}
      />
      <TextField label="Avatar" id="avatar" value={inputs.avatar} onChange={onInputChange} />
      <Select
        label="Role"
        id="role"
        value={inputs.role}
        options={[
          {label: '--select--', value: ''},
          {label: 'Admin', value: 'admin'},
          {label: 'Member', value: 'member'}
        ]}
        onChange={onInputChange}
      />
      <Checkbox label="Active" id="status" checked={inputs.status} onChange={onInputChange} />
    </>
  );

  const {modal, openModal} = useConfirmModal({
    buttonTitle: modalActionType === 'DELETE' ? 'Delete' : 'Save',
    destructive: modalActionType === 'DELETE',
    loading: creating || editing || deleting,
    content: modalActionType === 'DELETE' ? undefined : modalContent,
    disabled: modalActionType !== 'DELETE' && (inputs.email === '' || inputs.fullName === ''),
    HtmlTitle: modalTitle,
    confirmAction: action => handelAction(action, inputs),
    successCallback: handleSuccess,
    closeCallback: () => setInputs(initEmployee)
  });

  return (
    <Page
      title="Employees list"
      primaryAction={
        <ButtonGroup>
          <FileUploader setData={setData} />
          <Button
            primary
            onClick={() => {
              openModal('CREATE');
              setModalActionType('CREATE');
            }}
          >
            Create
          </Button>
        </ButtonGroup>
      }
    >
      <Layout>
        <Layout.Section>
          {loading ? <Spinner /> : Table}
          {modal}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
