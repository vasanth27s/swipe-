import { useSelector } from 'react-redux'
import CandidatesList from './Interviewertab/CandidatesList'
import CandidateDetails from './Interviewertab/CandidateDetails'
import SearchAndSort from './Interviewertab/SearchAndSort'

export default function InterviewerTab() {
  const { selectedCandidate } = useSelector(state => state.candidates)

  return (
    <div className="max-w-6xl mx-auto">
      {selectedCandidate ? (
        <CandidateDetails />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Candidate Dashboard
            </h2>
            <p className="text-gray-600">
              View and manage all interview candidates
            </p>
          </div>
          
          <SearchAndSort />
          <CandidatesList />
        </div>
      )}
    </div>
  )
}