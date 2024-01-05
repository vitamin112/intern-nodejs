import React from 'react';
import {Button, ButtonGroup, Card, Layout, Page} from '@shopify/polaris';
import {DesktopMajor, MobileMajor} from '@shopify/polaris-icons';
import MainFeedMedia from '../../components/MainFeedMedia/MainFeedMedia';
import {defaultSettings} from '../../const/settings';
import useFetchApi from '../../hooks/api/useFetchApi';
import {UserSection} from './components/UserSection/UserSection';
import {SettingSection} from './components/SettingSection/SettingSection';

/**
 * Render a MainFeed page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function MainFeed() {
  const {fetchApi, loading, data, setData} = useFetchApi({
    url: '/account',
    fullResp: true,
    defaultData: {}
  });
  const {settings, media} = data;

  return (
    <Page title="Main feed">
      <Layout>
        <Layout.Section>
          <UserSection data={data} loading={loading} setData={setData} successCallback={fetchApi} />
          <SettingSection settings={settings} setData={setData} />
          <Card title="Add to theme">
            <Card.Section>
              <Button disabled fullWidth>
                You are using a legacy theme, add it manually or contact our team
              </Button>
              <Button monochrome fullWidth plain>
                Learn how to add Instafeed to your theme or contact our support team
              </Button>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneThird>
          <Card title="Preview">
            <Card.Section>
              <MainFeedMedia data={media} settings={settings || defaultSettings} />
            </Card.Section>
            <Card.Section>
              <ButtonGroup>
                <Button icon={MobileMajor}>Mobile</Button>
                <Button icon={DesktopMajor}>Desktop</Button>
              </ButtonGroup>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
