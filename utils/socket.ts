import { Store } from "redux";
import * as socketio from "socket.io-client";

let store: Store;

const connectStore = (initedStore: Store) => {
  store = initedStore;
};

const socket = socketio.connect(
  process.env.NODE_ENV === "development"
    ? "http://192.168.0.28/"
    : "https://back.byker.io",
  {
    transports: ["websocket"],
    autoConnect: true,
  }
);

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
