import {useStore} from '@assets/reducers/storeReducer';
import {
  Avatar,
  Badge,
  Card,
  DisplayText,
  Heading,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  Stack
} from '@shopify/polaris';
import React from 'react';

/**
 * Render a Profile page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Profile() {
  const {state} = useStore();

  const user = state.user;

  return (
    <Page title="My account">
      <Layout>
        <Layout.Section>
          <Stack distribution={'fill'}>
            <Heading>Detail</Heading>
            <Card padding="400">
              <ResourceList
                resourceName={{singular: 'User', plural: 'Users'}}
                items={[
                  {
                    avatarSource: user ? user.avatar : '',
                    name: user ? user.fullName : '',
                    englishName: user ? user.englishName : '',
                    role: user ? user.role : ''
                  }
                ]}
                renderItem={item => {
                  const {avatarSource, name, englishName, role} = item;

                  return (
                    <ResourceItem
                      media={<Avatar customer name={name} source={avatarSource} />}
                      accessibilityLabel={`View details for ${name}`}
                      name={name}
                    >
                      <DisplayText variant="bodyMd" size="small">
                        {name}
                        <Badge tone="info">{role}</Badge>
                      </DisplayText>
                      <div>{englishName}</div>
                    </ResourceItem>
                  );
                }}
              />
            </Card>
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
