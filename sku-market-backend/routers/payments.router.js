const {
    newOrder,
    initializePayment,
} = require('../controllers/payments.controller');
const protect = require('../middleware/protect');
const router = require('express').Router();

router.use(protect);

router.route('/initialize').post(initializePayment);

// export router
module.exports = router;
