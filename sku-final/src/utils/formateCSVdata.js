const marketplace = [
  'noon/ksa',
  'noon/uae',
  'noon/egypt',
  'amazon/ksa',
  'amazon/uae',
  'jumia/egypt',
  'amazon/egypt',
];

const formateCSVdata = (data) => {
  const result = [];
  // loop over the data array
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const obj = {};

    obj.sku_marketplace = row[0];
    obj.sku = row[1];
    obj.store_id = row[2];
    obj.status = row[3] || true;

    // check if the marketplace is valid also check sku and marketplace combination is unique
    if (
      marketplace.includes(obj.sku_marketplace) &&
      !result.some((item) => item.sku === obj.sku && item.sku_marketplace === obj.sku_marketplace)
    ) {
      result.push(obj);
    }
  }

  console.log('result', result);

  return result;
};

export default formateCSVdata;
