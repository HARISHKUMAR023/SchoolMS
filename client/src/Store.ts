// src/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import storage from 'redux-persist/lib/storage';
// const persistConfig = {
//     key: 'root',
//     storage,
//   };
// const persistedReducer = persistReducer(persistConfig, authReducer);  
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
// const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;