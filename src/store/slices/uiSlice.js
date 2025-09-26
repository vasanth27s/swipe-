import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeTab: 'interviewee', 
    showWelcomeBack: false,
    loading: false,
    error: null,
    searchTerm: '',
    sortBy: 'score' 
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    setShowWelcomeBack: (state, action) => {
      state.showWelcomeBack = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { 
  setActiveTab, 
  setShowWelcomeBack, 
  setLoading, 
  setError, 
  setSearchTerm, 
  setSortBy, 
  clearError 
} = uiSlice.actions

export default uiSlice.reducer