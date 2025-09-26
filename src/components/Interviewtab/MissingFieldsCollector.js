import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateCandidate } from '@/store/slices/candidateSlice'
import { setPhase } from '@/store/slices/interviewSlice'

export default function MissingFieldsCollector() {
  const dispatch = useDispatch()
  const { missingFields } = useSelector(state => state.interview)
  const { list } = useSelector(state => state.candidates)
  const currentCandidate = list[list.length - 1] 
  
  const [formData, setFormData] = useState({
    name: currentCandidate?.name || '',
    email: currentCandidate?.email || '',
    phone: currentCandidate?.phone || ''
  })
  
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0)
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message: `Hello! I noticed a few details are missing from your profile. Let’s quickly get those filled in before we begin.`,
      timestamp: new Date()
    }
  ])

  const fieldLabels = {
    name: 'Full Name',
    email: 'Email Address', 
    phone: 'Phone Number'
  }

  const currentField = missingFields[currentFieldIndex]
  
  const handleSubmit = (value) => {
    const updatedData = { ...formData, [currentField]: value }
    setFormData(updatedData)
    
    setChatHistory(prev => [
      ...prev,
      { type: 'user', message: value, timestamp: new Date() },
      { 
        type: 'bot', 
        message: currentFieldIndex < missingFields.length - 1 
          ? `Awesome, thanks! Could you also share your ${fieldLabels[missingFields[currentFieldIndex + 1]]}?`
          : `Perfect, all set! We now have everything we need to move forward with your interview.`,
        timestamp: new Date()
      }
    ])
    
    if (currentFieldIndex < missingFields.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1)
    } else {
      dispatch(updateCandidate({ id: currentCandidate.id, ...updatedData }))
      dispatch(setPhase('interview'))
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-white shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800">Quick Info Check</h2>
        <p className="text-slate-600 mt-1">We just need a few details before starting your interview</p>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                msg.type === 'user' 
                  ? 'bg-indigo-200 text-black rounded-br-none'  // User text is black now
                  : 'bg-white text-blue-800 border border-slate-200 rounded-bl-none' // Bot text blue
              }`}>
                <p>{msg.message}</p>
                <p className="text-xs mt-1 opacity-60 text-gray-500">
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {currentFieldIndex < missingFields.length && (
            <div className="mb-4 flex justify-start">
              <div className="bg-white text-blue-800 border border-slate-200 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                <p>Could you please provide your {fieldLabels[currentField]}?</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Input Area */}
      {currentFieldIndex < missingFields.length && (
        <div className="p-6 border-t bg-white">
          <form onSubmit={(e) => {
            e.preventDefault()
            const input = e.target.elements.fieldValue
            if (input.value.trim()) {
              handleSubmit(input.value.trim())
              input.value = ''
            }
          }} className="flex gap-3">
            <input
              name="fieldValue"
              type={currentField === 'email' ? 'email' : currentField === 'phone' ? 'tel' : 'text'}
              placeholder={`Enter your ${fieldLabels[currentField]}`}
              className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-black"
              required
            />
            <button 
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
