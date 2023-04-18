const router = require("express").Router();
const {
    getConversation,
    getConversationById,
    sendMessage,
} = require("../controllers/message.controller");
const protect = require("../middleware/protect");

router.use(protect);

router.route("/").get(getConversation).post(sendMessage);
router.route("/:id").get(getConversationById);

module.exports = router;
