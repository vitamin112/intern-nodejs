const Shopify = require('Shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'my-avada-store.myshopify.com',
    accessToken: 'shpua_a54b45fffed7b048e78873d438074129'
  });

  // shopify.scriptTag.create({
  //   event: 'onload',
  //   src: 'https://localhost:3000/scripttag/index.min.js'
  // });
  // await shopify.scriptTag.delete(198328352944);

  //   shopify.metafield
  //     .create({
  //       key: 'warehouse',
  //       value: 25,
  //       type: 'integer',
  //       namespace: 'demo',
  //       owner_resource: 'shop'
  //     })
  //     .then(
  //       metafield => console.log(metafield),
  //       err => console.error(err)
  //     );

  //   await shopify.metafield.create({
  //     key: 'warehouse',
  //     value: 25,
  //     type: 'integer',
  //     namespace: 'demo',
  //     owner_resource: 'shop'
  //   });

  // await shopify.scriptTag.delete(198328352944);

  // await shopify.webhook.create({
  //   address: 'https://a02d-171-224-180-224.ngrok-free.app',
  //   topic: 'orders/create',
  //   format: 'json'
  // });
  const l = await shopify.webhook.list();
  console.log(l);
})();
