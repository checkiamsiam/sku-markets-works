const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");
const serverStore = require("./serverStore");
const ChatWithAdmin = require("./socketHandlers/ChatWithAdmin");
const authSocket = require("../middleware/authSocket");
const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  serverStore.setSocketServerInstance(io);
  io.use((socket, next) => {
    authSocket(socket, next);
  });
  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("user connected 💥" + socket.id);

    newConnectionHandler(socket, io);
    emitOnlineUsers();
    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });
    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });
    // chart with admin
    socket.on("chat-with-admin", (data) => {
      ChatWithAdmin(socket, data);
    });
    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });
  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);
};
module.exports = {
  registerSocketServer,
};
