const router = require("express").Router();
const protect = require("../middleware/protect");
const upload = require("../lib/multer");
const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    logoutUser,
    updatePassword,
    setRefreshToken,
    verifyEmail,
    sendOTP,
    verifyOTP,
    sendEmailVerificationToken,
    updateMe,
    updateAvatar,
    getUserProfile,
    updateAgreement,
    updateCover,
    uploadDocs,
} = require("../controllers/auth.controller");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/password/update").put(protect, updatePassword);
router.route("/refresh_token").get(protect, setRefreshToken);
router.route("/email/verify/:token").get(protect, verifyEmail);
router
    .route("/send/email/verify/token")
    .get(protect, sendEmailVerificationToken);
router.route("/send/otp").post(protect, sendOTP);
router.route("/verify/otp").post(protect, verifyOTP);

router.route("/updateMe").put(protect, updateMe);
router.route("/avatar").patch(protect, upload.single("avatar"), updateAvatar);
router.route("/user").get(protect, getUserProfile);
router.route("/agreement").patch(protect, updateAgreement);
router.route("/cover").patch(protect, upload.single("cover"), updateCover);
router.route("/docs/:field").patch(protect, upload.single("docs"), uploadDocs);

module.exports = router;
