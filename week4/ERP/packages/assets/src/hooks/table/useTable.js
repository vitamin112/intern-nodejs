import {Avatar, ButtonGroup, DataTable, Link} from '@shopify/polaris';
import React, {useState} from 'react';

/**
 * @param headings
 * @param columnContentTypes
 * @param url
 * @returns {Table: JSX.Element}, data, setData
 */
export default function useTable({
  columnContentTypes = [],
  headings = [],
  successCallback = () => {},
  closeCallback = () => {},
  defaultCurrentInput = null
}) {
  const [data, setData] = useState([]);

  const rowMarkup = data.map(({id, fullName, englishName, email, role, status, avatar}, index) => [
    index + 1,
    <Avatar source={avatar} />,
    <Link>{fullName}</Link>,
    englishName,
    email,
    role,
    status ? 'active' : '',
    <ButtonGroup variant="segmented">
      <Button
        icon={EditMinor}
        onClick={() => {
          openModal('UPDATE');
          setModalActionType('UPDATE');
          setInputs({id, fullName, englishName, email, role, status, avatar});
        }}
      />
      <Button
        icon={DeleteMajor}
        id={id}
        onClick={(a, b) => {
          openModal('DELETE');
          setModalActionType('DELETE');
          setInputs(id);
        }}
        destructive
      />
    </ButtonGroup>
  ]);

  const Table = (
    <DataTable columnContentTypes={columnContentTypes} headings={headings} rows={rowMarkup} />
  );

  return {Table};
}
