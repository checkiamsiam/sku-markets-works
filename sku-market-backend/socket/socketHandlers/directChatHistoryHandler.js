const directChatHistoryHandler = async (socket, data) => {
  try {
    // const { userId } = socket.user;
    // const { receiverUserId } = data;

    // const conversation = await Conversation.findOne({
    //   participants: { $all: [userId, receiverUserId] },
    //   type: "DIRECT",
    // });

    // if (conversation) {
    //   chatUpdates.updateChatHistory(conversation._id.toString(), socket.id);
    // }

    console.log("direct chat history event is being handled", data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = directChatHistoryHandler;
