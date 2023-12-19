const Shopify = require('Shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'my-avada-store.myshopify.com',
    accessToken: 'shpua_5057d82f397c9683c619274df0dee2dd'
  });
  // shopify.scriptTag.create({
  //   event: 'onload',
  //   src: 'https://localhost:3000/scripttag/index.min.js'
  // });
  // await shopify.scriptTag.delete(198328352944);
  const l = await shopify.scriptTag.list();

  console.log(l);
})();
