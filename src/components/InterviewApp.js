import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setActiveTab, setShowWelcomeBack } from '@/store/slices/uiSlice'
import TabNavigation from './TabNavigation'
import IntervieweeTab from './IntervieweeTab'
import InterviewerTab from './InterviewerTab'
import WelcomeBackModal from './WelcomeBackModal'

export default function InterviewApp() {
  const dispatch = useDispatch()
  const { activeTab, showWelcomeBack } = useSelector(state => state.ui)
  const { currentCandidateId, phase } = useSelector(state => state.interview)

  useEffect(() => {
    if (currentCandidateId && phase !== 'completed') {
      dispatch(setShowWelcomeBack(true))
    }
  }, [currentCandidateId, phase, dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      {showWelcomeBack && <WelcomeBackModal />}
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
            AI-Powered Interview Assistant
          </h1>
        </header>

        <TabNavigation />

        <div className="mt-8">
          {activeTab === 'interviewee' ? <IntervieweeTab /> : <InterviewerTab />}
        </div>
      </div>
    </div>
  )
}