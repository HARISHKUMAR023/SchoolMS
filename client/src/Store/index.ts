import { configureStore, EnhancedStore, Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../slices/authSlice';
import visibilityReducer from '../slices/visibilitySlice';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { AuthState } from './types';

// Configuration for persistence
const persistConfig = {
  key: 'root',
  storage,
};

// Apply persistence to authReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Store configuration
export const store: EnhancedStore<{
  auth: AuthState & PersistPartial;
  visibility: ReturnType<typeof visibilityReducer>; // Ensure correct type for visibility
}, Action> = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    visibility: visibilityReducer,
  },
});

// Create persistor for persistence
export const persistor = persistStore(store);

// Define types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
