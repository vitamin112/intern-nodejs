import {FormLayout, Select, TextField} from '@shopify/polaris';
import React from 'react';

const TriggerContentTab = ({settings, handleInputChange}) => {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];

  return (
    <FormLayout>
      <Select
        label="PAGES RESTRICTION"
        options={options}
        onChange={handleInputChange}
        value={settings.allowShow}
      />
      {settings.allowShow !== 'all' ? (
        <TextField
          id="includedUrls"
          label="Included pages"
          value={settings.includedUrls}
          onChange={handleInputChange}
          helpText="Pages URL NOT to show the pop-up(separated by lines)"
          multiline={4}
          autoComplete="off"
        />
      ) : (
        ''
      )}
      <TextField
        id="excludedUrls"
        label="Excluded pages"
        value={settings.excludedUrls}
        onChange={handleInputChange}
        helpText="Pages URL to show the pop-up(separated by lines)"
        multiline={4}
        autoComplete="off"
      />
    </FormLayout>
  );
};

export default TriggerContentTab;
