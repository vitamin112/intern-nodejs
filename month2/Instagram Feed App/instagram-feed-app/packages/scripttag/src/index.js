import React from 'react';
import {render} from 'react-dom';
import MainFeedMedia from '../../assets/src/components/MainFeedMedia/MainFeedMedia';

(async () => {
  async function getData() {
    const response = await fetch('https://localhost:3000/instagram/account');
    return await response.json();
  }

  const result = await getData();
  const {settings, media} = result.data;
  const container = document.createElement('div');
  container.id = 'instagramFeed';
  document.body.prepend(container);
  render(
    <MainFeedMedia settings={settings} data={media} />,
    document.getElementById('instagramFeed')
  );
})();
