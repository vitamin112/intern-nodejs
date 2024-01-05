import React from 'react';
import {render} from 'react-dom';
import MainFeedMedia from '../../assets/src/components/MainFeedMedia/MainFeedMedia';

(async () => {
  async function getData() {
    const response = await fetch('https://localhost:3000/clientApi/media');
    return await response.json();
  }

  const {media} = await getData();

  const settings = window.setting;

  const container = document.createElement('div');
  container.id = 'instagramFeed';
  document.body.prepend(container);
  render(
    <MainFeedMedia settings={settings || {}} data={media || []} />,
    document.getElementById('instagramFeed')
  );
})();
