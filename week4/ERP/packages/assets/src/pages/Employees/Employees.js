import {
  Avatar,
  Badge,
  Button,
  Card,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  TextStyle
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import useFetchApi from '../../hooks/api/useFetchApi';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */

function renderItem(item) {
  const {avatar, email, englishName, fullName, id, role, status} = item;
  const media = <Avatar source={avatar} customer size="medium" name={fullName} />;

  return (
    <ResourceItem id={id} media={media} accessibilityLabel={`View details for ${fullName}`}>
      <h3>
        <TextStyle variation="strong">{fullName}</TextStyle>
        <Badge status="success">{role}</Badge>
      </h3>
      <div>{englishName}</div>
    </ResourceItem>
  );
}

function EmployeesList({items, getting}) {
  const resourceName = {
    singular: 'Employee',
    plural: 'Employees'
  };

  return (
    <Card>
      <ResourceList
        loading={getting}
        items={items}
        renderItem={renderItem}
        resourceName={resourceName}
        alternateTool={<Button>Create employee</Button>}
      />
    </Card>
  );
}

export default function Employees() {
  const {data: employees, fetchApi, loading: getting} = useFetchApi({
    url: 'http://127.0.0.1:5000/api/employees'
  });

  async function getData() {
    return await fetchApi('http://127.0.0.1:5000/api/employees');
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Page title="Employees list">
      <Layout>
        <Layout.Section>
          <EmployeesList items={employees} getting={getting} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
EmployeesList.propTypes = {
  items: PropTypes.any,
  getting: PropTypes.bool
};
