const router = require('express').Router();
const protect = require('../middleware/protect');

const {
    createStore,
    updateStore,
    deleteStore,
    findStoreByProductId,
} = require('../controllers/store.controller');

router.use(protect);

router.route('/').post(createStore);
router.route('/product/:id').get(findStoreByProductId);
router.route('/:id').put(updateStore).delete(deleteStore);

// export router
module.exports = router;
