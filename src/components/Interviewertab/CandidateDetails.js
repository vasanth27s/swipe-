import { useSelector, useDispatch } from 'react-redux'
import { selectCandidate } from '@/store/slices/candidateSlice'

export default function CandidateDetails() {
  const dispatch = useDispatch()
  const { selectedCandidate } = useSelector(state => state.candidates)
  const { questions, answers } = useSelector(state => state.interview)

  if (!selectedCandidate) return null

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <button
            onClick={() => dispatch(selectCandidate(null))}
            className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
          <div className="text-right">
            <div className="text-sm text-blue-500">Interview Date</div>
            <div className="text-sm font-medium text-green-700">
              {new Date(selectedCandidate.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Info */}
      <div className="p-6 border-b grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">{selectedCandidate.name || 'N/A'}</h2>
          <div className="space-y-2 text-blue-700">
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>{selectedCandidate.email || 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📱</span>
              <span>{selectedCandidate.phone || 'N/A'}</span>
            </div>
          
            <div className="flex items-center space-x-2">
              <span>📅</span>
              <span>{new Date(selectedCandidate.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Interview Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-500">Status:</span>
              <span className={`font-medium capitalize ${
                selectedCandidate.status === 'completed' ? 'text-green-600' : 'text-blue-600'
              }`}>
                {selectedCandidate.status}
              </span>
            </div>
            {selectedCandidate.status === 'completed' && (
              <>
                <div className="flex justify-between">
                  <span className="text-blue-500">Final Score:</span>
                  <span className={`font-bold text-lg ${getScoreColor(selectedCandidate.score)}`}>
                    {selectedCandidate.score}/100
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-500">Completed:</span>
                  <span className="text-green-700 text-sm">
                    {selectedCandidate.completedAt ? new Date(selectedCandidate.completedAt).toLocaleString() : 'N/A'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* AI Summary */}
      {selectedCandidate.summary && (
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-green-800 mb-3">AI Summary</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-blue-700">{selectedCandidate.summary}</p>
          </div>
        </div>
      )}

      {/* Interview Q&A */}
      {selectedCandidate.status === 'completed' && answers.length > 0 && (
        <div className="p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Interview Questions & Answers</h3>
          <div className="space-y-6">
            {questions.map((question, index) => {
              const answer = answers.find(a => a.questionIndex === index)
              return (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-blue-600">Question {index + 1}</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                        <span className="text-xs text-blue-400">{question.timeLimit}s limit</span>
                      </div>
                      <p className="text-green-700 font-medium">{question.text}</p>
                    </div>
                  </div>
                  {answer && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-blue-600 text-sm font-medium">Answer:</span>
                        <div className="text-xs text-green-700">
                          Time used: {answer.timeUsed}s
                          {answer.autoSubmitted && (
                            <span className="ml-2 text-red-600">(Auto-submitted)</span>
                          )}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded p-3">
                        <p className="text-green-800 whitespace-pre-wrap">
                          {answer.answer || 'No answer provided'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Incomplete Status */}
      {selectedCandidate.status === 'incomplete' && (
        <div className="p-6 text-center">
          <div className="text-blue-600 text-4xl mb-2">⏳</div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Interview In Progress</h3>
          <p className="text-blue-700">This candidate hasn't completed their interview yet.</p>
        </div>
      )}
    </div>
  )
}
