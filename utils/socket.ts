import { Store } from "redux";
import * as socketio from "socket.io-client";

let store: Store;

const connectStore = (initedStore: Store) => {
  store = initedStore;
};

const socket = socketio.connect("http://192.168.0.15:3000", {
  transports: ["websocket"],
  autoConnect: true,
});

// const socket = socketio.connect("http://localhost:3000", {
//   transports: ["websocket"],
//   autoConnect: true,
// });

socket.on("message", (action: any) => {
  if (store) {
    store.dispatch(action);
  }
});

const init = (userId: string) => {
  socket.emit("createSession", userId);
};

const background = () => {
  socket.emit("background");
};

export default {
  connectStore,
  init,
  background,
};
