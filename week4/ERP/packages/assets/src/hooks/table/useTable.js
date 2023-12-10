import {Avatar, Button, ButtonGroup, DataTable, EmptyState, Link} from '@shopify/polaris';
import React, {useEffect} from 'react';
import useFetchApi from '../api/useFetchApi';

/**
 * @param url
 * @param headings
 * @param rowActions
 * @param columnContentTypes
 * @param emptyString
 * @returns {Table: JSX.Element, data, setData}
 */
export default function useTable({
  url = '',
  emptyString = 'Nothing here!',
  columnContentTypes = [],
  headings = [],
  rowActions = []
}) {
  const {data, setData, fetchApi, loading} = useFetchApi({url});

  useEffect(() => {
    const getData = async () => {
      return await fetchApi();
    };
    return () => getData;
  }, []);

  const rowMarkup = data.map((item, index) => [
    index + 1,
    <Avatar source={item.avatar} />,
    <Link>{item.fullName}</Link>,
    item.englishName,
    item.email,
    item.role,
    item.status ? 'active' : '',
    <ButtonGroup variant="segmented">
      {rowActions.map((action, index) => (
        <Button
          key={index}
          children={action.label}
          icon={action.icon}
          destructive={action.destructive}
          onClick={() => action.onAction(item)}
        />
      ))}
    </ButtonGroup>
  ]);

  const Table =
    data.length === 0 ? (
      <EmptyState heading={emptyString} />
    ) : (
      <DataTable columnContentTypes={columnContentTypes} headings={headings} rows={rowMarkup} />
    );

  return {Table, data, setData, loading};
}
