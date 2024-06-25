// src/store/store.ts
import { configureStore, EnhancedStore,Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer  from '../slices/authSlice'; // Import AuthState here
// If AuthState is defined in client/src/Store/types.ts, import it from there instead
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { AuthState } from './types';
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store: EnhancedStore<{
  auth: AuthState & PersistPartial;
}, Action> = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;