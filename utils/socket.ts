import { Store } from "redux";
import * as socketio from "socket.io-client";

let store: Store;

const connectStore = (initedStore: Store) => {
  store = initedStore;
};

console.log("connected");
const socket = socketio.connect("http://localhost:3000", {
  transports: ["websocket"],
  autoConnect: true,
});

socket.on("message", (action: any) => {
  if (store) {
    store.dispatch(action);
  }
});

const init = (userId: string) => {
  socket.emit("createSession", userId);
};

export default {
  connectStore,
  init,
};
