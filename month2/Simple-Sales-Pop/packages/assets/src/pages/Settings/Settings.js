import {Card, Layout, Page, Spinner, Tabs} from '@shopify/polaris';
import React, {useCallback, useEffect, useState} from 'react';
import DisplayTabContent from './components/DisplayContentTab/DisplayContentTab';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import TriggerTabContent from './components/TriggerContentTab/TriggerContentTab';
import useEditApi from '../../hooks/api/useEditApi';
import useFetchApi from '../../hooks/api/useFetchApi';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const {editing, handleEdit} = useEditApi({url: '/settings'});
  const {fetchApi, data: settings, setData: setSettings, loading} = useFetchApi({
    url: '/settings'
  });

  const getSettings = async () => {
    await fetchApi();
  };

  useEffect(() => {
    getSettings();
  }, []);

  const handleInputChange = useCallback((value, key) => {
    setSettings(prev => {
      return {...prev, [key]: value};
    });
  }, []);

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'Display',
      children: <DisplayTabContent settings={settings} handleInputChange={handleInputChange} />,
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

  const handleSettingUpdate = async () => {
    await handleEdit(settings);
  };

  return (
    <Page
      title="Settings"
      primaryAction={{content: 'Save', loading: editing, onAction: handleSettingUpdate}}
      subtitle="Decide how your notifications will display"
      fullWidth
    >
      {loading || editing ? (
        <Spinner />
      ) : (
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
      )}
    </Page>
  );
}

Settings.propTypes = {};
