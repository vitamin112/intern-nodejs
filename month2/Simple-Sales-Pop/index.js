const Shopify = require('Shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'my-avada-store.myshopify.com',
    accessToken: 'shpua_b3b80a9a8b3bc293b80bba7e7d2a5ce2'
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
  const l = await shopify.webhook.list();
  console.log(l);
})();
