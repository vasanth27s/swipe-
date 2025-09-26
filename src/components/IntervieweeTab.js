import { useState } from 'react'
import { useSelector } from 'react-redux'
import ResumeUpload from './Interviewtab/ResumeUpload'
import ChatInterface from './Interviewtab/ChatInterface'
import MissingFieldsCollector from './Interviewtab/MissingFieldsCollector'

export default function IntervieweeTab() {
  const { phase, currentCandidateId } = useSelector(state => state.interview)

  const renderContent = () => {
    switch (phase) {
      case 'upload':
        return <ResumeUpload />
      case 'collecting-info':
        return <MissingFieldsCollector />
      case 'interview':
      case 'completed':
        return <ChatInterface />
      default:
        return <ResumeUpload />
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md min-h-[600px]">
        {renderContent()}
      </div>
    </div>
  )
}