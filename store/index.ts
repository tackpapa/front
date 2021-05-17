import { createStore, Store, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { persistStore } from "redux-persist";
import { RootAction, RootState } from "./types";
import rootReducer from "./reducer";
import rootEpic from "./epic";
import { handleSignIn } from "./utils";

import { composeWithDevTools } from "redux-devtools-extension";

const persistHandler = (store: Store<RootState>) => () => {
  const state = store.getState();
  if (state.user.token) {
    handleSignIn(state.user.token, state.user._id);
  }
};

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

const middlewares: any[] = [epicMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

epicMiddleware.run(rootEpic);

const persistor = persistStore(store, undefined, persistHandler(store));
persistor.purge();

export { store, persistor };
