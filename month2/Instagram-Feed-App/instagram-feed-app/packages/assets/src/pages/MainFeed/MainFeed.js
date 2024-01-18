import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Card, Layout, Page} from '@shopify/polaris';
import {DesktopMajor, MobileMajor, ToggleMinor} from '@shopify/polaris-icons';
import MainFeedMedia from '../../components/MainFeedMedia/MainFeedMedia';
import {defaultSettings} from '../../const/settings';
import useFetchApi from '../../hooks/api/useFetchApi';
import {UserSection} from './components/UserSection/UserSection';
import {SettingSection} from './components/SettingSection/SettingSection';
import './MainFeed.scss';
import useEditApi from '../../hooks/api/useEditApi';

/**
 * Render a MainFeed page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function MainFeed() {
  const [previewScreen, setPreviewScreen] = useState('mobile');
  const [updateItems, setUpdateItems] = useState([]);
  const {fetchApi, loading, data, setData} = useFetchApi({
    url: '/account',
    fullResp: true,
    defaultData: {}
  });
  const {handleEdit, editing} = useEditApi({url: '/updateMedia'});

  const handleChangeScreen = () => {
    setPreviewScreen(previewScreen === 'mobile' ? 'desktop' : 'mobile');
  };

  const handelSelectedItem = async media => {
    setData(prev => ({
      ...prev,
      media: prev.media.map(item => (item.id === media.id ? {...item, isHide: !item.isHide} : item))
    }));

    setUpdateItems(prev => {
      const isMediaExist = prev.some(item => item.id === media.id);
      return isMediaExist
        ? [...prev.filter(item => item.id !== media.id)]
        : [...prev, {...media, isHide: !media.isHide}];
    });
  };

  const handleUpdateMedia = async () => {
    const updatedDocId = data.media.reduce((acc, item) => {
      return updateItems.find(media => media.id === item.id) &&
        !acc.find(docId => docId === item.docId)
        ? (acc.push(item.docId), acc)
        : acc;
    }, []);

    await handleEdit(
      updatedDocId.map(docId => {
        return {
          docId,
          media: data.media.filter(media => media.docId === docId)
        };
      })
    );
    setUpdateItems([]);
  };

  return (
    <Page title="Main feed">
      <Layout>
        <Layout.Section oneThird>
          <UserSection data={data} loading={loading} setData={setData} successCallback={fetchApi} />
          <SettingSection settings={data?.settings} setData={setData} />
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
                  <MainFeedMedia
                    data={data?.media}
                    handelSelectedItem={handelSelectedItem}
                    settings={data?.settings || defaultSettings}
                    isPreview={true}
                  />
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
                {updateItems.length ? (
                  <Button loading={editing} onClick={handleUpdateMedia} icon={ToggleMinor}>
                    Save
                  </Button>
                ) : null}
              </ButtonGroup>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
