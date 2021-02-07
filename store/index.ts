import { createStore, Store, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { persistStore, persistReducer } from "redux-persist";
import { RootAction, RootState } from "./types";
import rootReducer from "./reducer";
import rootEpic from "./epic";
import { handleSignIn } from "./utils";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";

const persistHandler = (store: Store<RootState>) => () => {
  const state = store.getState();
  if (state.user.token) {
    handleSignIn(state.user.token);
  }
};
const loggerMiddleware = createLogger();
const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

// const persistConfig = {
//   key: "root",
//   storage,
// };

const middlewares: any[] = [
  epicMiddleware,
  // loggerMiddleware
];

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);

epicMiddleware.run(rootEpic);

const persistor = persistStore(store, undefined, persistHandler(store));

export { store, persistor };
