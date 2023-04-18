const router = require('express').Router();
const protect = require('../middleware/protect');

const {
    createWatchList,
    getWatchLists,
    deleteWatchList,
    pushProduct,
    getWatchList,
    deleteProduct,
    updateWatchList,
} = require('../controllers/watchList.controller');

router.use(protect);
router.route('/').post(createWatchList).get(getWatchLists);
router
    .route('/:id')
    .delete(deleteWatchList)
    .get(getWatchList)
    .put(updateWatchList);
router.route('/:id/product/:product').delete(deleteProduct).put(pushProduct);

// export router
module.exports = router;
