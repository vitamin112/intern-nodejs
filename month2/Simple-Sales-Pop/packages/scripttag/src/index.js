(() => {
  function createStyledPopup(content, imageUrl) {
    // Create the popup wrapper
    const popupWrapper = document.createElement('div');
    popupWrapper.style.position = 'fixed';
    popupWrapper.style.top = '10px';
    popupWrapper.style.left = '10px';
    popupWrapper.style.backgroundColor = '#ccc';
    popupWrapper.style.padding = '10px';
    popupWrapper.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    popupWrapper.style.borderRadius = '5px';
    popupWrapper.style.zIndex = '9999';
    popupWrapper.style.maxWidth = '20%';

    // Create the content element
    const popupContent = document.createElement('div');
    popupContent.innerHTML = content;
    popupContent.style.marginBottom = '10px'; // Adjust margin as needed

    // Create the image element
    const popupImage = document.createElement('img');
    popupImage.src = imageUrl;
    popupImage.style.maxWidth = '10%'; // Adjust max-width as needed

    // Append content and image to the popup wrapper
    popupWrapper.appendChild(popupContent);
    popupWrapper.appendChild(popupImage);

    // Append the popup to the body
    document.body.appendChild(popupWrapper);
    setTimeout(() => {
      document.body.removeChild(popupWrapper);
    }, 3000);
  }

  // Example usage
  const popupContent = '<p>This is a styled popup content</p>';
  const popupImageUrl =
    'https://images.unsplash.com/photo-1682686581362-796145f0e123?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  createStyledPopup(popupContent, popupImageUrl);
})();
