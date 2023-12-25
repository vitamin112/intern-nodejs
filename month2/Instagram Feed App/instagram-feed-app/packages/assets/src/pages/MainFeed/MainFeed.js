import React, {useState} from 'react';
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
import {api} from '../../helpers';
import {baseUrl, clientId} from '../../config/app';

/**
 * Render a MainFeed page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function MainFeed() {
  const [enabled, setEnabled] = useState(false);
  const {dispatch} = useStore();

  (async () => {
    await api();
  })();

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
              >
                {' '}
                <Link
                  id="authLink"
                  url={`https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${baseUrl}/auth/&scope=user_profile,user_media&response_type=code`}
                ></Link>
                <Label HtmlForm="authForm" id="authLink">
                  Connect with Instagram
                </Label>
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
