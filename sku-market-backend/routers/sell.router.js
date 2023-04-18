const { createSell, getSells } = require('../controllers/sell.controller');

const router = require('express').Router();

router.route('/').get(getSells);
router.route('/product/:id').post(createSell);

// export router
module.exports = router;
