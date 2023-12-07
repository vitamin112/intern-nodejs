import {
  Avatar,
  Card,
  Checkbox,
  EmptyState,
  IndexTable,
  Layout,
  Page,
  Select,
  TextField,
  TextStyle,
  useIndexResourceState
} from '@shopify/polaris';
import React, {useEffect, useState} from 'react';
import useCreateApi from '../../hooks/api/useCreateApi';
import useFetchApi from '../../hooks/api/useFetchApi';
import useConfirmModal from '../../hooks/popup/useConfirmModal';

/**
 * Render a employees page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */

function EmployeesList({items, loading}) {
  const resourceName = {
    singular: 'employee',
    plural: 'employees'
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(
    items
  );

  const promotedBulkActions = [
    {
      content: 'Edit employees',
      onAction: () => console.log('Todo: implement bulk edit')
    }
  ];
  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags')
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags')
    },
    {
      content: 'Delete employees',
      onAction: () => console.log('Todo: implement bulk delete')
    }
  ];

  const rowMarkup = items.map(({id, fullName, englishName, email, role, status, avatar}, index) => (
    <IndexTable.Row id={id} key={id} selected={selectedResources.includes(id)} position={index}>
      <IndexTable.Cell>
        <Avatar source={avatar} />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <TextStyle variation="strong">{fullName}</TextStyle>
      </IndexTable.Cell>
      <IndexTable.Cell>{englishName}</IndexTable.Cell>
      <IndexTable.Cell>{email}</IndexTable.Cell>
      <IndexTable.Cell>{role}</IndexTable.Cell>
      <IndexTable.Cell>
        <div style={{padding: '10px'}}>{status ? 'active' : ''}</div>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Card>
      <IndexTable
        loading={loading}
        emptyState={<EmptyState />}
        resourceName={resourceName}
        itemCount={items.length}
        selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
        onSelectionChange={handleSelectionChange}
        bulkActions={bulkActions}
        promotedBulkActions={promotedBulkActions}
        headings={[
          {title: 'Avatar'},
          {title: 'Full Name'},
          {title: 'English Name'},
          {title: 'Email'},
          {title: 'Status'},
          {title: 'Role'}
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export default function Employees() {
  const initEmployee = {
    email: '',
    fullName: '',
    role: '',
    status: false,
    avatar: '',
    englishName: ''
  };
  const {creating, handleCreate} = useCreateApi({url: '/employees'});
  const {data: employees, setData: setEmployees, fetchApi, loading: getting} = useFetchApi({
    url: '/employees'
  });
  const [isInValid, setIsInValid] = useState(true);
  const [inputs, setInputs] = useState(initEmployee);

  const onInputChange = (value, key) => {
    setInputs(pre => ({...pre, [key]: value}));
  };

  const validInput = () => {
    if (inputs.email !== '' && inputs.fullName !== '') {
      setIsInValid(false);
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
        onBlur={validInput}
        onChange={onInputChange}
      />

      <TextField
        label="Full name"
        requiredIndicator
        id="fullName"
        value={inputs.fullName}
        onBlur={validInput}
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
    content: modalContent,
    buttonTitle: 'Create',
    defaultCurrentInput: inputs,
    confirmAction: () => handleCreate(inputs),
    loading: creating,
    disabled: isInValid,
    successCallback: e => {
      if (e) {
        setEmployees(prev => [...prev, inputs]);
        setInputs(initEmployee);
      } else {
      }
    }
  });

  useEffect(() => {
    const getData = async () => {
      return await fetchApi();
    };
    return () => getData;
  }, []);

  return (
    <Page
      title="Employees list"
      primaryAction={{
        content: 'Create',
        onAction: () => {
          openModal();
        }
      }}
    >
      <Layout>
        <Layout.Section>
          {modal}
          <EmployeesList items={employees} loading={getting} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
