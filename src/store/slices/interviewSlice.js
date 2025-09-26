import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentCandidateId: null,
  questions: [],
  currentQuestionIndex: 0,
  timeRemaining: 0,
  isPaused: false,
  isActive: false,
  answers: [],
  phase: 'upload', 
  missingFields: []
}

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    startInterview: (state, action) => {
      const { candidateId, questions } = action.payload
      state.currentCandidateId = candidateId
      state.questions = questions
      state.currentQuestionIndex = 0
      state.timeRemaining = questions[0]?.timeLimit || 20
      state.isActive = true
      state.isPaused = false
      state.phase = 'interview'
      state.answers = []
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1
        const nextQuestion = state.questions[state.currentQuestionIndex]
        state.timeRemaining = nextQuestion.timeLimit
      } else {
        state.isActive = false
        state.phase = 'completed'
      }
    },
    submitAnswer: (state, action) => {
      const { answer, timeUsed } = action.payload
      state.answers.push({
        questionIndex: state.currentQuestionIndex,
        answer,
        timeUsed,
        submittedAt: new Date().toISOString()
      })
    },
    updateTimer: (state, action) => {
      state.timeRemaining = action.payload
      if (state.timeRemaining <= 0) {
        // Auto-submit when time runs out
        state.answers.push({
          questionIndex: state.currentQuestionIndex,
          answer: '',
          timeUsed: state.questions[state.currentQuestionIndex]?.timeLimit || 0,
          submittedAt: new Date().toISOString(),
          autoSubmitted: true
        })
        if (state.currentQuestionIndex < state.questions.length - 1) {
          state.currentQuestionIndex += 1
          const nextQuestion = state.questions[state.currentQuestionIndex]
          state.timeRemaining = nextQuestion.timeLimit
        } else {
          state.isActive = false
          state.phase = 'completed'
        }
      }
    },
    pauseInterview: (state) => {
      state.isPaused = true
    },
    resumeInterview: (state) => {
      state.isPaused = false
    },
    resetInterview: (state) => {
      return { ...initialState }
    },
    setPhase: (state, action) => {
      state.phase = action.payload
    },
    setMissingFields: (state, action) => {
      state.missingFields = action.payload
    }
  }
})

export const { 
  startInterview, 
  nextQuestion, 
  submitAnswer, 
  updateTimer, 
  pauseInterview, 
  resumeInterview, 
  resetInterview,
  setPhase,
  setMissingFields
} = interviewSlice.actions

export default interviewSlice.reducer