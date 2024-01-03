import React from 'react';
import {render} from 'react-dom';
import MainFeedMedia from '../../assets/src/components/MainFeedMedia/MainFeedMedia';

(async () => {
  async function getData() {
    const response = await fetch('https://localhost:3000/instagram/account');
    return await response.json();
  }

  const result = await getData();
  const {media} = result.data;

  const settings = window.setting;

  const container = document.createElement('div');
  container.id = 'instagramFeed';
  document.body.prepend(container);
  render(
    <MainFeedMedia settings={settings || {}} data={media} />,
    document.getElementById('instagramFeed')
  );
})();
