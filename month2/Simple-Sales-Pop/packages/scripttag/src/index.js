// (async () => {
//   async function getData() {
//     const response = await fetch(
//       'https://localhost:3000/clientApi/shop?domain=my-avada-store.myshopify.com'
//     );
//     return await response.json();
//   }
//   const result = await getData();
//   const {setting} = result.data;
//   const {notifications} = result.data;
//   console.log(setting, notifications);

//   function createStyledPopup(data) {
//     const popupWrapper = document.createElement('div');
//     popupWrapper.style.position = 'fixed';
//     popupWrapper.style.top = '10px';
//     popupWrapper.style.left = '10px';
//     popupWrapper.style.backgroundColor = '#ccc';
//     popupWrapper.style.padding = '10px';
//     popupWrapper.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
//     popupWrapper.style.borderRadius = '5px';
//     popupWrapper.style.zIndex = '9';
//     popupWrapper.style.maxWidth = '20%';

//     const popupContent = document.createElement('div');
//     popupContent.innerHTML = data.productName;

//     const popupImage = document.createElement('img');
//     popupImage.src = data.productImage;
//     popupImage.style.maxWidth = '100%';

//     popupWrapper.appendChild(popupContent);
//     popupWrapper.appendChild(popupImage);

//     document.body.appendChild(popupWrapper);
//     setTimeout(() => {
//       document.body.removeChild(popupWrapper);
//     }, 3000);
//   }

//   createStyledPopup(notifications[0]);
// })();
// index.js or App.js
import React from 'react';
import {render} from 'react-dom';
import NotificationPopup from './components/NotificationPopup/NotificationPopup';

(async () => {
  async function getData() {
    const response = await fetch(
      'https://localhost:3000/clientApi/shop?domain=my-avada-store.myshopify.com'
    );
    return await response.json();
  }
  const result = await getData();
  const {setting} = result.data;
  const {notifications} = result.data;

  const container = document.createElement('div');
  container.id = 'container';

  document.body.appendChild(container);

  return render(
    <NotificationPopup setting={setting} data={notifications[0]} />,
    document.getElementById('container')
  );
})();
