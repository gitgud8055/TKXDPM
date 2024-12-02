import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rest from "./middlewares/rest";

const rootReducer = combineReducers({});

const configPersist = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(configPersist, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware({ serializableCheck: false }), rest] as any,
});

export const persistor = persistStore(store);
