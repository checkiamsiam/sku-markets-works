const router = require('express').Router();

const {
    marketPlaceAnalytics,
    AnalyticsByMarketPlace,
} = require('../controllers/marketplace.controller');

router.route('/:marketplace/analytics').get(AnalyticsByMarketPlace);
router.route('/analytics').get(marketPlaceAnalytics);

// export router
module.exports = router;
