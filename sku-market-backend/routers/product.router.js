const protect = require('../middleware/protect');
const router = require('express').Router();

const { updatePrice, getPrice } = require('../controllers/price.controller');
const {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getTotalProducts,
    searchProductsPaginate,
    productSummary,
    getProductImage,
    updateProductImages,
} = require('../controllers/product.controller');

router.route('/total').get(getTotalProducts);
router.route('/search').get(searchProductsPaginate);
router.route('/summary').get(productSummary);
router.route('/image/:sku').get(getProductImage).put(updateProductImages);

router.route('/').get(getProducts).post(protect, createProduct);

router
    .route('/:id')
    .get(getProduct)
    .put(protect, updateProduct)
    .delete(protect, deleteProduct);

router.route('/updatePrice/:id').put(protect, updatePrice).get(getPrice);

// export router
module.exports = router;
