/**
 * @param {Object} shopify
 * @param {String} shopId
 * @return {Promise<void>}
 */
export async function getNotifications(shopify, id) {
  const getFormattedTimestamp = dateString => (dateString ? new Date(dateString).getTime() : null);

  const orders = await shopify.order.list({status: 'any'});
  const products = await shopify.product.list({
    id: orders.map(order => order.line_items[0].product_id)
  });

  return orders.map(order => {
    return {
      firstName: order.billing_address.first_name || '',
      city: order.billing_address.city || '',
      country: order.billing_address.country || '',
      shopId: id || '',
      timestamp: getFormattedTimestamp(order.created_at) || '',
      productName: order.line_items[0].title || '',
      productId: order.line_items[0].product_id || null,
      productImage: products.find(p => p.id === order.line_items[0].product_id).image.src || null
    };
  });
}

/**
 * @param {Object} shopify
 * @param {String} shopId
 * @return {Promise<void>}
 */
export async function getNotification(shopify, id, data) {
  try {
    const getFormattedTimestamp = dateString =>
      dateString ? new Date(dateString).getTime() : null;

    const product = await shopify.product.get(data.line_items[0].product_id);

    return {
      firstName: data.billing_address.first_name || '',
      city: data.billing_address.city || '',
      country: data.billing_address.country || '',
      shopId: id || '',
      timestamp: getFormattedTimestamp(data.created_at) || '',
      productName: data.line_items[0].title || '',
      productId: data.line_items[0].product_id || null,
      productImage: product.image.src
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
