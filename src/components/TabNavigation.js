import { useSelector, useDispatch } from 'react-redux'
import { setActiveTab } from '@/store/slices/uiSlice'

export default function TabNavigation() {
  const dispatch = useDispatch()
  const { activeTab } = useSelector(state => state.ui)

  const tabs = [
    { id: 'interviewee', label: 'Interviewee'},
    { id: 'interviewer', label: 'Interviewer Dashboard' }
  ]

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-2">
        <div className="flex space-x-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => dispatch(setActiveTab(tab.id))}
              className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}