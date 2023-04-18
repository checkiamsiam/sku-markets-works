const ShipmentPendingRows = ({ orders }) => {
  let shipmentPendingDataRow = [];

  orders?.map(({ orderNo: order, deductedQty }) => {
    shipmentPendingDataRow?.push({
      orderId: order?._id,
      id: order?._id,
      sku: order?.product?.sku,
      partner_code: 'XXX',
      brand_en: order?.product?.brand_en,
      all_images: order?.product?.all_images,
      sku_marketplace: order?.product?.sku_marketplace,
      quantity: order?.quantity - deductedQty,
    });
  });

  return shipmentPendingDataRow;
};

export default ShipmentPendingRows;
