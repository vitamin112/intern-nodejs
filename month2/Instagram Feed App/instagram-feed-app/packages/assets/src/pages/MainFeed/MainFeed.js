import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import {
  Badge,
  Banner,
  Button,
  ButtonGroup,
  Card,
  DisplayText,
  FormLayout,
  Label,
  Layout,
  Link,
  Page,
  Select,
  Stack,
  TextField,
  TextStyle,
  Thumbnail
} from '@shopify/polaris';
import {useStore} from '@assets/reducers/storeReducer';
import {LockMajor, StarOutlineMinor, DesktopMajor, MobileMajor} from '@shopify/polaris-icons';
import MainFeedMedia from '../../components/MainFeedMedia/MainFeedMedia';
import {baseUrl, clientId, clientSecret, redirect_uri} from '../../config/app';
import {reducer} from '@assets/actions/storeActions';
import queryString from 'query-string';
import axios from 'axios';
import useCreateApi from '../../hooks/api/useCreateApi';
import useFetchApi from '../../hooks/api/useFetchApi';

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
  const [loginWindow, setLoginWindow] = useState(window);
  const {settings, media} = data;

  useEffect(() => {
    fetchApi();
  }, []);

  const openLoginPopUp = () => {
    const popup = window.open(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}/instagramAuth/getToken&scope=user_profile,user_media&response_type=code`,
      'auth',
      'height=500,width=400'
    );
    setLoginWindow(popup);

    popup.addEventListener('unload', () => {
      handleBeforeUnload();
    });
  };

  const handleBeforeUnload = useCallback(() => {
    if (loginWindow.location.href.includes('authorize')) {
      loginWindow.close();
    }
  });

  const logOut = () => {
    setData({settings: null, media: null});
  };
  if (loginWindow?.closed) {
    loginWindow.opener.location.reload();
  }

  useEffect(() => {
    function getToken() {
      const param = queryString.parse(window.location.search);
      console.log('param', param);
      if (param.code) {
        console.log('code', param.code);
        loginWindow.close();
      }
    }

    getToken();

    return () => getToken;
  }, [loginWindow.unload]);

  return (
    <Page title="Main feed">
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              {!data?.settings ? (
                <Button
                  loading={loading}
                  icon={
                    <svg
                      width={24}
                      height={24}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 10.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Zm1 0a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"
                      />
                      <path d="M13.25 7.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                      <path
                        fillRule="evenodd"
                        d="M12.5 17h-6a3.5 3.5 0 0 1-3.5-3.5v-6a3.5 3.5 0 0 1 3.5-3.5h6a3.5 3.5 0 0 1 3.5 3.5v6a3.5 3.5 0 0 1-3.5 3.5Zm-8.5-9.5a2.5 2.5 0 0 1 2.5-2.5h6a2.5 2.5 0 0 1 2.5 2.5v6a2.5 2.5 0 0 1-2.5 2.5h-6a2.5 2.5 0 0 1-2.5-2.5v-6Z"
                      />
                    </svg>
                  }
                  primary
                  onClick={openLoginPopUp}
                >
                  {' '}
                  Connect with Instagram
                </Button>
              ) : (
                <DisplayText size="small">
                  Connected to <TextStyle variation="strong">@{settings?.username}</TextStyle> |{' '}
                  <Button monochrome plain onClick={openLoginPopUp}>
                    Change account
                  </Button>{' '}
                  |{' '}
                  <Button monochrome plain onClick={logOut}>
                    Disconnect
                  </Button>
                </DisplayText>
              )}
            </Card.Section>
          </Card>
          <Card>
            <Card.Section>
              <FormLayout>
                <TextField label={<TextStyle variation="strong">Feed tile</TextStyle>} />
                <FormLayout.Group>
                  <Stack>
                    <Select
                      label={<TextStyle variation="strong">On post click</TextStyle>}
                      onChange={() => {}}
                      options={[{label: 'Open popup/show product'}]}
                    />
                    <TextField
                      label={<TextStyle variation="strong">Post spacing</TextStyle>}
                      onChange={() => {}}
                    />
                    <Select
                      label={<TextStyle variation="strong">Rounded corners</TextStyle>}
                      onChange={() => {}}
                      options={[{label: 'No'}]}
                    />
                  </Stack>
                </FormLayout.Group>
                <FormLayout.Group>
                  <Select
                    label={<TextStyle variation="strong">Layout</TextStyle>}
                    onChange={() => {}}
                    autoComplete="off"
                    options={[{label: 'Grid - Squares (1:1)'}]}
                  />
                  <Select
                    label={<TextStyle variation="strong">Configuration</TextStyle>}
                    onChange={() => {}}
                    options={[{label: 'Manual'}]}
                  />
                </FormLayout.Group>
                <FormLayout.Group>
                  <TextField
                    label={<TextStyle variation="strong">Number of rows</TextStyle>}
                    onChange={() => {}}
                    autoComplete="off"
                  />
                  <TextField
                    label={<TextStyle variation="strong">Number of columns</TextStyle>}
                    onChange={() => {}}
                    autoComplete="off"
                  />
                </FormLayout.Group>
                <Button fullWidth primary>
                  Save
                </Button>
              </FormLayout>
            </Card.Section>
          </Card>
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
          <Card>
            <Card.Section>
              <FormLayout>
                <TextStyle size="small">
                  You current plan
                  <Badge size="medium" status="info">
                    INSTAFEED FREE
                  </Badge>
                </TextStyle>
                <ButtonGroup>
                  <Button primary icon={LockMajor}>
                    Upgrade
                  </Button>
                  <Button icon={StarOutlineMinor}>Rate us</Button>
                </ButtonGroup>
                <Banner status="info">
                  Make the most of Reels, product tagging, cross-device configurations and more.
                  <Link>Try Instafeed premium features for free for 3 days!</Link>
                </Banner>
              </FormLayout>
            </Card.Section>
          </Card>
          <Card title="Preview">
            <Card.Section>
              <MainFeedMedia />
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
