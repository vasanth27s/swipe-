import { createSlice } from '@reduxjs/toolkit'

const candidateSlice = createSlice({
  name: 'candidates',
  initialState: {
    list: [],
    selectedCandidate: null,
  },
  reducers: {
    addCandidate: (state, action) => {
      state.list.push({
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        status: 'incomplete',
        score: 0,
        summary: ''
      })
    },
    updateCandidate: (state, action) => {
      const index = state.list.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload }
      }
    },
    selectCandidate: (state, action) => {
      state.selectedCandidate = action.payload
    },
    completeInterview: (state, action) => {
      const { candidateId, score, summary } = action.payload
      const index = state.list.findIndex(c => c.id === candidateId)
      if (index !== -1) {
        state.list[index].status = 'completed'
        state.list[index].score = score
        state.list[index].summary = summary
        state.list[index].completedAt = new Date().toISOString()
      }
    }
  }
})

export const { addCandidate, updateCandidate, selectCandidate, completeInterview } = candidateSlice.actions
export default candidateSlice.reducer