import React, {useEffect, useReducer, useState} from 'react';
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
import {baseUrl, clientId, clientSecret} from '../../config/app';
import {reducer} from '@assets/actions/storeActions';
import queryString from 'query-string';

/**
 * Render a MainFeed page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function MainFeed() {
  const {state, dispatch} = useStore();
  const {shop} = state;

  const [loginWindow, setLoginWindow] = useState(window);
  const [code, setCode] = useState('');

  useEffect(() => {
    const url = localStorage.getItem('url');
    if (url) {
      const code = url.split('=')[1];
      fetch(`https://api.instagram.com/oauth/access_token`, {
        method: 'POST',
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: `${baseUrl}/`,
          code
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          // dispatch({type: 'SET_TOKEN', payload: data.access_token});
          // dispatch({type: 'SET_USER', payload: data.user});
          // dispatch({type: 'SET_MEDIA', payload: data.media});
          // dispatch({type: 'SET_LOADING', payload: false});
          // dispatch({type: 'SET_ERROR', payload: false});
          // dispatch({type: 'SET_INSTAGRAM', payload: true});
        })
        .catch(err => {
          console.log(err);
          // dispatch({type: 'SET_LOADING', payload: false});
          // dispatch({type: 'SET_ERROR', payload: true});
        });
    }
  });

  const openLoginPopUp = () => {
    const popup = window.open(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=https://localhost:3000/&scope=user_profile,user_media&response_type=code`,
      'auth',
      'height=500,width=400'
    );
    setLoginWindow(popup);
  };

  const handleGetToken = async code => {
    const resp = await fetch(`https://api.instagram.com/oauth/access_token`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: `${baseUrl}/`,
        code
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await resp.json();
    localStorage.setItem('token', json.stringify(data.access_token));
    loginWindow.close();
    // dispatch({type: 'SET_TOKEN', payload: data.access_token});
  };

  useEffect(async () => {
    const param = queryString.parse(window.location.search);
    if (param.code) {
      localStorage.setItem('code', param.code);
      await handleGetToken(param.code);
    }
  }, [loginWindow.unload]);

  return (
    <Page title="Main feed">
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              <Button
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
              <DisplayText size="small">
                Connected to <TextStyle variation="strong">@anyone</TextStyle> |{' '}
                <Button monochrome plain>
                  Change account
                </Button>{' '}
                |{' '}
                <Button monochrome plain>
                  Disconnect
                </Button>
              </DisplayText>
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
