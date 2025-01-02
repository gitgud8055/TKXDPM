import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rest from "./middlewares/rest";
import auth from "./auth";
import ui from "./ui";
import meta from "./meta";
import groups from "./groups";
import favs from "./favs";
import dish from "./dish";
import ws from "./middlewares/ws";
import member from "./group-members";

const combinedReducer = combineReducers({
  auth,
  ui,
  meta,
  entities: combineReducers({
    groups,
    favs,
    dish,
    member,
  }),
});

const rootReducer = (state, action) => {
  if (action.type === "auth/Logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const configPersist = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(configPersist, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware({ serializableCheck: false }), rest, ws] as any,
});

export const persistor = persistStore(store);
