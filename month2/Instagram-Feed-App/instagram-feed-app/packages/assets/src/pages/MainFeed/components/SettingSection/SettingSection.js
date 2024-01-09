import React, {useCallback} from 'react';
import {Button, Card, FormLayout, RangeSlider, TextField, TextStyle} from '@shopify/polaris';
import {defaultSettings} from '../../../../const/settings';
import useEditApi from '../../../../hooks/api/useEditApi';

export const SettingSection = ({settings, setData}) => {
  const {editing, handleEdit: handleSave} = useEditApi({
    url: '/settings'
  });

  const handleSettingChange = useCallback(
    (value, key) => setData(prev => ({...prev, settings: {...prev.settings, [key]: value}})),
    []
  );

  const handleSaveSettings = async () => {
    await handleSave(settings);
  };

  return (
    <Card>
      <Card.Section>
        <FormLayout>
          <TextField
            value={settings?.title}
            id="title"
            onChange={handleSettingChange}
            label={<TextStyle variation="strong">Feed tile</TextStyle>}
          />

          <RangeSlider
            output
            label={<TextStyle variation="strong">Post spacing</TextStyle>}
            min={1}
            max={50}
            id="spacing"
            value={settings?.spacing ? settings?.spacing : defaultSettings.spacing}
            onChange={handleSettingChange}
            suffix={(settings?.spacing ? settings?.spacing : defaultSettings.spacing) + ' px'}
          />

          <FormLayout.Group>
            <RangeSlider
              output
              label={<TextStyle variation="strong">Number of rows</TextStyle>}
              min={1}
              max={7}
              step={1}
              suffix={(settings?.numOfRow || defaultSettings.numOfRow) + ' Rows'}
              id="numOfRow"
              value={settings?.numOfRow ? settings?.numOfRow : defaultSettings.numOfRow}
              onChange={handleSettingChange}
            />
            <RangeSlider
              output
              label={<TextStyle variation="strong">Number of columns</TextStyle>}
              min={1}
              max={7}
              step={1}
              suffix={(settings?.numOfColumn || defaultSettings.numOfColumn) + ' Columns'}
              id="numOfColumn"
              value={settings?.numOfColumn ? settings?.numOfColumn : defaultSettings.numOfColumn}
              onChange={handleSettingChange}
            />
          </FormLayout.Group>
          <Button fullWidth primary onClick={handleSaveSettings} loading={editing}>
            Save
          </Button>
        </FormLayout>
      </Card.Section>
    </Card>
  );
};
