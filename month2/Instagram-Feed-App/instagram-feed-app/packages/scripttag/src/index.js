import React, {useState} from 'react';
import {render} from 'react-dom';
import MainFeedMedia from '../../assets/src/components/MainFeedMedia/MainFeedMedia';

(async () => {
  const settings = window.setting;

  async function getData() {
    const response = await fetch(`https://localhost:3000/clientApi/media?domain=${Shopify.shop}`);
    return await response.json();
  }

  const {media} = await getData();
  const container = document.createElement('div');
  container.id = 'instagramFeed';
  document.body.prepend(container);
  render(
    <MainFeedMedia settings={settings || {}} data={media || []} />,
    document.getElementById('instagramFeed')
  );
})();
