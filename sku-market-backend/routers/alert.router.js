const {
    getAlerts,
    Alert,
    deleteAlert,
    createManyAlerts,
} = require('../controllers/alert.controller');
const router = require('express').Router();
const protect = require('../middleware/protect');

router.use(protect);

router.route('/').post(Alert).get(getAlerts);
router.route('/bulk').post(createManyAlerts);
router.route('/:id').delete(deleteAlert);

module.exports = router;
