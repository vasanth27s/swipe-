import { useSelector, useDispatch } from 'react-redux'
import { selectCandidate } from '@/store/slices/candidateSlice'

export default function CandidatesList() {
  const dispatch = useDispatch()
  const { list } = useSelector(state => state.candidates)
  const { searchTerm, sortBy } = useSelector(state => state.ui)
  
  // Filter and sort candidates
  const filteredAndSortedCandidates = list
    .filter(candidate => {
      if (!searchTerm) return true
      const searchLower = searchTerm.toLowerCase()
      return (
        candidate.name?.toLowerCase().includes(searchLower) ||
        candidate.email?.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score
        case 'name':
          return (a.name || '').localeCompare(b.name || '')
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'incomplete': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }
  
  if (list.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Candidates Yet
        </h3>
        <p className="text-gray-600">
          Candidates will appear here after they upload their resumes and complete interviews.
        </p>
      </div>
    )
  }
  
  if (filteredAndSortedCandidates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Results Found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search criteria or filters.
        </p>
      </div>
    )
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Candidate
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAndSortedCandidates.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {candidate.name || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {candidate.email || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {candidate.phone || 'N/A'}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                  {candidate.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-semibold ${getScoreColor(candidate.score)}`}>
                  {candidate.status === 'completed' ? `${candidate.score}/100` : '-'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(candidate.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => dispatch(selectCandidate(candidate))}
                  className="text-blue-600 hover:text-blue-900 transition-colors"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}