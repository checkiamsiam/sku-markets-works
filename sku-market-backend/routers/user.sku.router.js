const router = require("express").Router();
const {
  deleteSku,
  getUserSku,
  getEmptySku,
  createOrUpdate,
  getStoreCompetitors,
  getOpportunityToBuyBox,
  getTopBrandsOrCategory,
  isSkuWatchListed,
  isAlertedProduct
} = require("../controllers/user.sku.controller");
const apiFeature = require("../middleware/api.feature");
const protect = require("../middleware/protect");

router.use(protect);

router.route("/isWatchListed/:productId").get(isSkuWatchListed);
router.route("/isAlerted/:productId").get(isAlertedProduct);
router.route("/empty").get(getEmptySku);
router.route("/top").get(getTopBrandsOrCategory);
router.route("/competitors").get(getStoreCompetitors);
router.route("/opportunity").get(getOpportunityToBuyBox);
router.route("/").get(getUserSku).post(createOrUpdate);
router.route("/:id").delete(deleteSku);

module.exports = router;
