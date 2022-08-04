import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import settingsReducer from "./settings/settingsReducer";
import accountsReducer from "./accounts/accountsReducer";
import entriesReducer from "./entries/entriesReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["settings", "entries"],
};

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  accounts: accountsReducer,
  entries: entriesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
