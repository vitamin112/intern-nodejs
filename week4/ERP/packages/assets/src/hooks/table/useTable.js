import {Avatar, ButtonGroup, Link} from '@shopify/polaris';
import React from 'react';

/**
 * @param headings
 * @param rows
 * @returns {Table: JSX.Element}
 */
export default function useTable({
  confirmAction,
  title = 'Are you sure to delete?',
  HtmlTitle = null,
  sectioned = true,
  canCloseAfterFinished = true,
  successCallback = () => {},
  closeCallback = () => {},
  defaultCurrentInput = null
}) {
  const rowMarkup = items.map(({id, fullName, englishName, email, role, status, avatar}, index) => [
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
    <DataTable
      columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text']}
      headings={['#', 'Avatar', 'Full name', 'English name', 'Email', 'Role', 'Status', '']}
      rows={rowMarkup}
    >
      {rowMarkup}
    </DataTable>
  );

  return {Table};
}
