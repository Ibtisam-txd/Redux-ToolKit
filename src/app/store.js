import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default: localStorage for web
import { combineReducers } from 'redux';
import todoReducer from '../features/todo/todoSlice';
import apiSlice from '../features/todo/api/apiSlice';

const persistConfig = {
  key: 'root',
  storage, 
};

const persistedTodoReducer = persistReducer(persistConfig, todoReducer);

const rootReducer = combineReducers({
  todos: persistedTodoReducer,
  [apiSlice.reducerPath]: apiSlice.reducer, 
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
