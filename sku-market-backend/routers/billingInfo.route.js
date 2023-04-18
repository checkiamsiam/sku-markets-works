const router = require("express").Router();
const protect = require("../middleware/protect");
const {
  addNewInfo,
  getBillingInfo,
  deleteBillingInfo,
  updateBillingInfo,
} = require("../controllers/billingInfo.controller");

router.route("/add").post(protect, addNewInfo);
router.route("/get").get(protect, getBillingInfo);
router.route("/delete").delete(protect, deleteBillingInfo);
router.route("/update").patch(protect, updateBillingInfo);

module.exports = router;
