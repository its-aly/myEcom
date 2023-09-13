import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productReducer from "./productRedux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; //libraries from redux-persist
import storage from "redux-persist/lib/storage"; //for creating a local storage(persisted)

const persistConfig = {
  key: "root", //it can be a custom name cuz every store should have a key
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); //here we will pass the reducer we want to make persist

const store = configureStore({
  reducer: persistedReducer,
  middleware: (
    getDefaultMiddleware //readymade boiler plate from redux toolkit beginer guide
  ) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
export default store;
