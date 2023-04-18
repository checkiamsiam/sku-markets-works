import { config } from 'config';
import io from 'socket.io-client';

let socket = null;

export const connectWithSocketServer = (user) => {
  socket = io(config.baseUrl, {
    auth: {
      token: user?.token,
    },
  });

  socket.on('connect', () => {
    console.log('successfully connected with socket.io server' + socket.id);
  });

  // listen for message
  socket.on('new-connection', (data) => {
    // new Audio('/sounds/new-connection.mp3').play();
    // console.log({ newUser: data });
  });

  // listen for message
  socket.on('disconnect-users', (data) => {
    // new Audio('/sounds/disconnect-users.mp3').play();
    // console.log({ disconnectUser: data });
  });

  // listen for error
  socket.on('error', (error) => {
    console.log(error);
  });

  // listen for disconnect
  socket.on('disconnect', () => {
    console.log('disconnected from socket.io server');
  });
};

export const getSocket = () => {
  return socket;
};
