/**
 * @param {Object}
 * @param {String}
 * @return {Promise<void>}
 */

export async function getNotifications(shopify, id) {
  const getFormattedTimestamp = dateString => (dateString ? new Date(dateString).getTime() : null);

  const orders = await shopify.order.list({status: 'any'});

  const notifications = await Promise.all(
    orders.map(async order => {
      return {
        firstName: order.billing_address.first_name || '',
        city: order.billing_address.city || '',
        country: order.billing_address.country || '',
        shopId: id || '',
        timestamp: getFormattedTimestamp(order.created_at) || '',
        productName: order.line_items[0].title || '',
        productId: order.line_items[0].product_id || null,
        productImage: (await shopify.product.get(order.line_items[0].product_id)).image.src
      };
    })
  );
  return notifications;
}
