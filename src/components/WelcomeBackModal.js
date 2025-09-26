import { useSelector, useDispatch } from 'react-redux'
import { setShowWelcomeBack } from '@/store/slices/uiSlice'
import { resumeInterview, resetInterview } from '@/store/slices/interviewSlice'

export default function WelcomeBackModal() {
  const dispatch = useDispatch()
  const { currentCandidateId, currentQuestionIndex, questions } = useSelector(state => state.interview)
  const { list } = useSelector(state => state.candidates)
  
  const currentCandidate = list.find(c => c.id === currentCandidateId)
  
  const handleContinue = () => {
    dispatch(resumeInterview())
    dispatch(setShowWelcomeBack(false))
  }
  
  const handleStartOver = () => {
    dispatch(resetInterview())
    dispatch(setShowWelcomeBack(false))
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">👋</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600">
            We found an incomplete interview session for {currentCandidate?.name || 'your account'}.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600">
            <p className="mb-1">
              <span className="font-medium">Progress:</span> Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="mb-1">
              <span className="font-medium">Candidate:</span> {currentCandidate?.name}
            </p>
            <p>
              <span className="font-medium">Status:</span> Interview in progress
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleStartOver}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Start Over
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Interview
          </button>
        </div>
      </div>
    </div>
  )
}