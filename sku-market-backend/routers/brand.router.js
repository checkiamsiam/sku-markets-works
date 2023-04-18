const { topBrands } = require('../controllers/brand.controller');
const { brandAnalytics } = require('../controllers/product.controller');

const router = require('express').Router();

router.route('/top').get(topBrands);
router.route('/:brand').get(brandAnalytics);

// export router
module.exports = router;
