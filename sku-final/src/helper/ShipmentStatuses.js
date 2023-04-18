export const ShipmentStatus = {
  // When Payment Status is PAID (Default)
  PREPARING: 'PREPARING',

  // When the shipment status is "PREPARING", SELLER can do one of the following
  ////////////////////////
  PREPARING_CANCELLED_FROM_SELLER: 'PREPARING_CANCELLED_FROM_SELLER',
  PICKED: 'PICKED',
  ////////////////////////

  // When the shipment status is "PICKED", SELLER can do one of the following
  ////////////////////////
  PACKED: 'PACKED',
  /*
   * PREPARING_CANCELLED_FROM_SELLER
   */
  ////////////////////////

  // When the shipment status is "PACKED", SELLER can do one of the following
  ////////////////////////
  SHIPPED: 'SHIPPED',
  /*
   * PREPARING_CANCELLED_FROM_SELLER
   */
  ////////////////////////

  // When the shipment status is "SHIPPED", SELLER can do one of the following
  ////////////////////////
  SHIPPED_CANCELLED_FROM_SELLER: 'SHIPPED_CANCELLED_FROM_SELLER',
  DELIVERED: 'DELIVERED',
  ////////////////////////

  // When the shipment status is "DELIVERED", BUYER can do one of the following
  ////////////////////////
  CONFIRMED: 'CONFIRMED',
  RTV_PENDING: 'RTV_PENDING',
  ////////////////////////

  // When the shipment status is "RTV_PENDING", SELLER can do one of the following
  ////////////////////////
  RTV_PENDING_CANCELLED_FROM_SELLER: 'RTV_PENDING_CANCELLED_FROM_SELLER',
  RTV_CONFIRMED: 'RTV_CONFIRMED',
  ////////////////////////

  // When the shipment status is "RTV_CONFIRMED", BUYER can do one of the following
  ////////////////////////
  RTV_SHIPPED: 'RTV_SHIPPED',
  RTV_CANCELLED_FROM_BUYER: 'RTV_CANCELLED_FROM_BUYER',
  ////////////////////////

  // When the shipment status is "RTV_SHIPPED", BUYER can do one of the following
  ////////////////////////
  RTV_DELIVERED: 'RTV_DELIVERED',
  /*
   * RTV_CANCELLED_FROM_BUYER
   */
  ////////////////////////

  // When the shipment status is "RTV_DELIVERED", SELLER can do one of the following
  ////////////////////////
  RTV_DELIVERED_CANCELLED_FROM_SELLER: 'RTV_DELIVERED_CANCELLED_FROM_SELLER',
  RTV_COMPLETED: 'RTV_COMPLETED',
  ////////////////////////
};
