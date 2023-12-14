import {Card, Layout, Page, Tabs} from '@shopify/polaris';
import React, {useCallback, useState} from 'react';
import DisplayTabContent from '../../components/DisplayContentTab/DisplayContentTab';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import TriggerTabContent from '../../components/TriggerContentTab/TriggerContentTab';
import {defaultSettings} from '../../config/setting';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [settings, setSettings] = useState(defaultSettings);
  const handleInputChange = useCallback((value, key) => {
    setSettings(prev => {
      return {...prev, [key]: value};
    });
  }, []);

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'display',
      children: <DisplayTabContent settings={settings} setSettings={setSettings} />,
      panelID: 'all-customers-content-1'
    },
    {
      id: 'prospects-1',
      content: 'Triggers',
      children: <TriggerTabContent settings={settings} handleInputChange={handleInputChange} />,
      panelID: 'prospects-content-1'
    }
  ];

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

  return (
    <Page
      title="Settings"
      primaryAction={{content: 'Save'}}
      subtitle="Decide how your notifications will display"
      fullWidth
    >
      <Layout>
        <Layout.Section oneThird>
          <NotificationPopup />
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <Card.Section>{tabs[selected].children}</Card.Section>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
