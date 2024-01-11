import React from 'react';
import useCreateApi from '../../../../hooks/api/useCreateApi';
import {clientId, redirect_uri} from '../../../../config/app';
import {Button, ButtonGroup, Card, DisplayText, TextStyle} from '@shopify/polaris';
import useFetchApi from '../../../../hooks/api/useFetchApi';

export const UserSection = ({data, loading, setData, successCallback}) => {
  const {fetchApi: handleRefresh, loading: refreshing} = useFetchApi({
    url: '/refresh?token=' + data?.settings?.accessToken,
    initLoad: false
  });
  const {fetchApi: handleSync, loading: syncing} = useFetchApi({
    url: '/syncMedia?token=' + data?.settings?.accessToken,
    initLoad: false
  });

  const openLoginPopUp = () => {
    const popup = window.open(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}/clientApi/getToken&scope=user_profile,user_media&response_type=code&state=${activeShop.shopID}`,
      'auth',
      'height=500,width=400'
    );

    const isPopUpClosed = setInterval(() => {
      try {
        if (popup.location.href.includes('code')) {
          popup.close();
          successCallback();
          clearInterval(isPopUpClosed);
        }
      } catch (error) {}
    }, 500);
  };

  const {creating, handleCreate: handleLogout} = useCreateApi({
    url: '/logout'
  });

  const logOut = async () => {
    setData({settings: null, media: null});
    await handleLogout();
  };

  const reFresh = async () => {
    await handleRefresh();
    await fetchApi();
  };

  const syncMedia = async () => {
    await handleSync();
    await fetchApi();
  };

  return (
    <Card>
      <Card.Section>
        {!data?.settings?.username ? (
          <Button
            loading={loading}
            icon={
              <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
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
            Connected to <TextStyle variation="strong">@{data?.settings?.username}</TextStyle>
            <ButtonGroup>
              <Button destructive onClick={logOut}>
                Disconnect
              </Button>
              <Button primary onClick={syncMedia} loading={syncing}>
                Sync Media
              </Button>
              <Button onClick={reFresh} loading={refreshing}>
                ReFresh
              </Button>
            </ButtonGroup>
          </DisplayText>
        )}
      </Card.Section>
    </Card>
  );
};
