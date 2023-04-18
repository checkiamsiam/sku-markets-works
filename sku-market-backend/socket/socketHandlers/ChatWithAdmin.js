const Message = require("../../models/message.model");
const userModel = require("../../models/user.model");

const ChatWithAdmin = async (socket, data) => {
  try {
    const adminEmail = "admin@2p.sa";

    // find admin user
    const admin = await userModel
      .find({ email: adminEmail })
      .select("socketId");

    // save message to db
    const data = await Message.create({
      sender: socket.user._id,
      receiver: admin[0]._id,
      message: data?.message,
      type: "text",
    });

    // if admin is online
    if (admin.length > 0 || admin[0].socketId !== null) {
      // emit to admin
      socket.to(admin[0].socketId).emit("chat-with-admin", {
        ...data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = ChatWithAdmin;
