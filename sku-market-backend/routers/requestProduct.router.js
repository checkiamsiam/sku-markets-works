const router = require('express').Router();
const {
    createOrUpdate,
    getEmptySku,
    getUserSku,
    removeSku,
} = require('../controllers/requestProduct.controller');
const protect = require('../middleware/protect');

router.use(protect);

router.route('/').post(createOrUpdate);
router.route('/empty').get(getEmptySku);
router.route('/user').get(getUserSku).put(removeSku);

module.exports = router;
