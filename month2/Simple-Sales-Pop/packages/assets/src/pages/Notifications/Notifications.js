import {useStore} from '@assets/reducers/storeReducer';
import {Layout, Page, SettingToggle, TextStyle} from '@shopify/polaris';
import React, {useState} from 'react';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const [enabled, setEnabled] = useState(false);
  const {dispatch} = useStore();

  return (
    <Page title="Notifications">
      <Layout>
        <Layout.Section></Layout.Section>
      </Layout>
    </Page>
  );
}
