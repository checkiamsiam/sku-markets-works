export const addVisitedSku = (id) => {
  let productIds = localStorage.getItem('recentlyVisitedSkus');

  if (!productIds) {
    productIds = [id];
  } else {
    productIds = JSON.parse(productIds);

    if (!productIds.includes(id)) {
      if (productIds.length == 50) {
        productIds.pop();
      }
      productIds.unshift(id);
    }
  }

  localStorage.setItem('recentlyVisitedSkus', JSON.stringify(productIds));
};

export const getVisitedSkus = () => {
  const productIds = localStorage.getItem('recentlyVisitedSkus');

  if (!productIds) {
    return [];
  } else {
    return JSON.parse(productIds);
  }
};
