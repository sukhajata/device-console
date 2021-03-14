//import AsyncStorage from "@react-native-community/async-storage";
//import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import rootReducer from "./reducers";
import localforage from 'localforage';
import createCompressEncryptor from 'redux-persist-transform-compress-encrypt'
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// encrypt persisted state
const transformer = createCompressEncryptor({
  secretKey: 'B6gd45sRevtVkQ9bcT58',
  onError: (error) => {
      //fired whenever there is any issue with transformation, 
      //compression or encryption/decryption
      console.log(error);
  }
});

const persistConfig = {
  key: "root",
  storage: localforage,
  transforms: [transformer],
  blacklist: ['filter'], // do not persist filter, users may forget they have set a value
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const logger = createLogger({
  //predicate: makeLogFilter('realtime/getRealtimePQ', 'realtime/getRealtimeUplink', 'realtime/streamRealtimeUplink', 'realtime/getRealtimeInst', 'realtime/streamRealtimeInst'),
  stateTransformer: state => state.filter,
});

// Redux: Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

// Middleware: Redux Persist Persister
const persistor = persistStore(store);
//persistor.purge();

// Exports
export { store, persistor };
