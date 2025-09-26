import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startInterview, submitAnswer, nextQuestion } from '@/store/slices/interviewSlice'
import { completeInterview } from '@/store/slices/candidateSlice'
import QuestionTimer from './QuestionTimer'

const MOCK_QUESTIONS = [
  { 
    id: 1, 
    text: 'Why is JavaScript single-threaded, and how does the event loop handle asynchronous operations?', 
    difficulty: 'easy', 
    timeLimit: 20 
  },
  { 
    id: 2, 
    text: 'Explain React’s Virtual DOM. How does reconciliation improve rendering performance?', 
    difficulty: 'easy', 
    timeLimit: 20 
  },
  { 
    id: 3, 
    text: 'How would you design and implement role-based access control (RBAC) in a MERN application?', 
    difficulty: 'medium', 
    timeLimit: 60 
  },
  { 
    id: 4, 
    text: 'What is the difference between REST and GraphQL? When would you choose one over the other?', 
    difficulty: 'medium', 
    timeLimit: 60 
  },
  { 
    id: 5, 
    text: 'Architect a scalable video streaming platform. Cover CDN usage, database choices, caching, and handling millions of concurrent viewers.', 
    difficulty: 'hard', 
    timeLimit: 120 
  },
  { 
    id: 6, 
    text: 'Build a custom React hook for infinite scrolling that fetches paginated API data efficiently. Explain potential performance bottlenecks.', 
    difficulty: 'hard', 
    timeLimit: 120 
  }
];

export default function ChatInterface() {
  const dispatch = useDispatch()
  const messagesEndRef = useRef(null)
  const [currentAnswer, setCurrentAnswer] = useState('')
  
  const { 
    questions, 
    currentQuestionIndex, 
    timeRemaining, 
    isActive, 
    phase, 
    currentCandidateId 
  } = useSelector(state => state.interview)
  
  const { list } = useSelector(state => state.candidates)
  const currentCandidate = list.find(c => c.id === currentCandidateId)
  
  const [chatHistory, setChatHistory] = useState([])
  
  useEffect(() => {
    if (phase === 'interview' && questions.length === 0) {
      dispatch(startInterview({ 
        candidateId: currentCandidateId, 
        questions: MOCK_QUESTIONS 
      }))
      
      setChatHistory([
        {
          type: 'bot',
          message: `🎉 Welcome ${currentCandidate?.name || 'Candidate'}! Your interview is starting. You'll face 6 questions: 2 Easy (20s each), 2 Medium (60s), and 2 Hard (120s). Good luck!`,
          timestamp: new Date()
        },
        {
          type: 'bot', 
          message: `❓ Question 1 (Easy): ${MOCK_QUESTIONS[0].text}`,
          timestamp: new Date()
        }
      ])
    }
  }, [phase, questions.length, dispatch, currentCandidateId, currentCandidate?.name])
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory])
  
  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) return
    
    const timeUsed = questions[currentQuestionIndex]?.timeLimit - timeRemaining
    
    setChatHistory(prev => [
      ...prev,
      {
        type: 'user',
        message: currentAnswer,
        timestamp: new Date()
      }
    ])
    
    dispatch(submitAnswer({ answer: currentAnswer, timeUsed }))
    setCurrentAnswer('')
    
    if (currentQuestionIndex >= questions.length - 1) {
      setChatHistory(prev => [
        ...prev,
        {
          type: 'bot',
          message: '✅ Interview completed! Evaluating your answers...',
          timestamp: new Date()
        }
      ])
      
      setTimeout(() => {
        const mockScore = Math.floor(Math.random() * 40) + 60 // 60-100
        const mockSummary = `Candidate showed strong frontend/backend skills. Great in React, needs more depth in system design. Overall score: ${mockScore}/100.`
        
        dispatch(completeInterview({
          candidateId: currentCandidateId,
          score: mockScore,
          summary: mockSummary
        }))
        
        setChatHistory(prev => [
          ...prev,
          {
            type: 'bot',
            message: `📊 Your score: ${mockScore}/100. ${mockSummary}`,
            timestamp: new Date()
          }
        ])
      }, 2000)
    } else {
      dispatch(nextQuestion())
      
      setTimeout(() => {
        const nextQ = questions[currentQuestionIndex + 1]
        setChatHistory(prev => [
          ...prev,
          {
            type: 'bot',
            message: `❓ Question ${currentQuestionIndex + 2} (${nextQ.difficulty}): ${nextQ.text}`,
            timestamp: new Date()
          }
        ])
      }, 1000)
    }
  }
  
  const currentQuestion = questions[currentQuestionIndex]
  const isCompleted = phase === 'completed'
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900/60 backdrop-blur">
        <div>
          <h2 className="text-2xl font-bold text-purple-400">Interview in Progress</h2>
          <p className="text-gray-400 mt-1">
            {isCompleted ? '✨ Interview Completed!' : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
          </p>
        </div>
        {!isCompleted && currentQuestion && (
          <QuestionTimer 
            timeRemaining={timeRemaining}
            totalTime={currentQuestion.timeLimit}
            difficulty={currentQuestion.difficulty}
          />
        )}
      </div>
      
      {/* Chat Section */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg px-4 py-3 rounded-2xl shadow-md ${
                msg.type === 'user' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'bg-gray-700 text-gray-100'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                <p className="text-xs mt-2 opacity-70">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Section */}
      {!isCompleted && isActive && (
        <div className="p-6 border-t border-gray-700 bg-gray-900/70 backdrop-blur">
          <div className="max-w-3xl mx-auto">
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="💬 Type your answer here..."
              className="w-full border border-gray-600 rounded-xl p-3 h-28 resize-none bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={!isActive}
            />
            <div className="flex justify-end mt-3">
              <button 
                onClick={handleSubmitAnswer}
                disabled={!currentAnswer.trim() || !isActive}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
