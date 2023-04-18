const decodedUser = require("../middleware/decodedUser");
const userModel = require("../models/user.model");
const verifyTokenSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;

  try {
    // const decoded = decodedUser(token);

    // Check if user still exists
    const currentUser = await userModel.findById(token);
    if (!currentUser) {
      const socketError = new Error("User not found");
      return next(socketError);
    }
    currentUser.socketId = socket.id;
    await currentUser.save();
    socket.user = currentUser;
  } catch (err) {
    console.log(err);
    return next(new Error("Authentication error - " + err.message));
  }
  next();
};
module.exports = verifyTokenSocket;
