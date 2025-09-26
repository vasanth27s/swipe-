import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateTimer } from '@/store/slices/interviewSlice'

export default function QuestionTimer({ timeRemaining, totalTime, difficulty }) {
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        dispatch(updateTimer(timeRemaining - 1))
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [timeRemaining, dispatch])
  
  const percentage = (timeRemaining / totalTime) * 100
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  
  const getColorClass = () => {
    if (percentage > 50) return 'bg-green-500'
    if (percentage > 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }
  
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }
  
  return (
    <div className="flex items-center space-x-4">
      <div className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getDifficultyColor()}`}>
        {difficulty}
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="text-lg font-mono font-semibold">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${getColorClass()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}