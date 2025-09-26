import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'

import candidateSlice from './slices/candidateSlice'
import interviewSlice from './slices/interviewSlice'
import uiSlice from './slices/uiSlice'

const rootReducer = combineReducers({
  candidates: candidateSlice,
  interview: interviewSlice,
  ui: uiSlice,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['candidates', 'interview']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)