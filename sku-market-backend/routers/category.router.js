const {
    topCategories,
    analyticsBuyCategory,
    categoryAnalytics,
} = require('../controllers/category.controller');

const router = require('express').Router();

router.route('/').get(topCategories);
router.route('/analytics').get(categoryAnalytics);
router.route('/:category').get(analyticsBuyCategory);

// export router
module.exports = router;
