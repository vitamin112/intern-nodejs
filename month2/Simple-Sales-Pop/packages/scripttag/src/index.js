import React from 'react';
import {render} from 'react-dom';
import NotificationPopup from '../../assets/src/components/NotificationPopup/NotificationPopup';

(async () => {
  async function getData() {
    const response = await fetch(
      'https://localhost:3000/clientApi/shop?domain=my-avada-store.myshopify.com'
    );
    return await response.json();
  }

  const result = await getData();
  const setting = window.setting;
  const {notifications} = result.data;

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
  }

  async function showPopupsSequentially(notifications) {
    for (let i = 0; i < notifications.length; i++) {
      await delay(i === 0 ? setting.firstDelay : setting.popsInterval);

      const container = document.createElement('div');
      container.id = 'container';

      document.body.appendChild(container);
      render(
        <NotificationPopup setting={setting} data={notifications[i]} />,
        document.getElementById('container')
      );
      await delay(setting.displayDuration);
      document.body.removeChild(container);
    }
  }

  showPopupsSequentially(notifications);
})();
