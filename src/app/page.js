'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import InterviewApp from '@/components/InterviewApp'

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div className="flex items-center justify-center min-h-screen">Loading...</div>} persistor={persistor}>
        <InterviewApp />
      </PersistGate>
    </Provider>
  )
}