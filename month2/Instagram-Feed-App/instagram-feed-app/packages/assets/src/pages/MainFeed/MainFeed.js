import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Layout, Page} from '@shopify/polaris';
import {DesktopMajor, MobileMajor} from '@shopify/polaris-icons';
import MainFeedMedia from '../../components/MainFeedMedia/MainFeedMedia';
import {defaultSettings} from '../../const/settings';
import useFetchApi from '../../hooks/api/useFetchApi';
import {UserSection} from './components/UserSection/UserSection';
import {SettingSection} from './components/SettingSection/SettingSection';
import './MainFeed.scss';

/**
 * Render a MainFeed page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function MainFeed() {
  const [previewScreen, setPreviewScreen] = useState('mobile');
  const {fetchApi, loading, data, setData} = useFetchApi({
    url: '/account',
    fullResp: true,
    defaultData: {}
  });
  const {fetchApi: handleRefresh, loading: refreshing} = useFetchApi({
    url: '/refresh?token=' + data?.settings?.accessToken,
    initLoad: false
  });

  const {settings, media} = data;

  const handleChangeScreen = () => {
    setPreviewScreen(previewScreen === 'mobile' ? 'desktop' : 'mobile');
  };

  const reFresh = async () => {
    await handleRefresh();
    await fetchApi();
  };

  return (
    <Page
      title="Main feed"
      primaryAction={
        !data?.settings?.username
          ? ''
          : {content: 'ReFresh', loading: refreshing, onAction: reFresh}
      }
    >
      <Layout>
        <Layout.Section oneThird>
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
        <Layout.Section>
          <Card title="Preview">
            <Card.Section>
              <div className={previewScreen}>
                <div className="content">
                  <MainFeedMedia data={media} settings={settings || defaultSettings} />
                </div>
              </div>
            </Card.Section>
            <Card.Section>
              <ButtonGroup>
                <Button
                  primary={previewScreen === 'mobile'}
                  onClick={handleChangeScreen}
                  icon={MobileMajor}
                >
                  Mobile
                </Button>
                <Button
                  primary={previewScreen === 'desktop'}
                  onClick={handleChangeScreen}
                  icon={DesktopMajor}
                >
                  Desktop
                </Button>
              </ButtonGroup>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
