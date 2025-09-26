import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm, setSortBy } from '@/store/slices/uiSlice'

export default function SearchAndSort() {
  const dispatch = useDispatch()
  const { searchTerm, sortBy } = useSelector(state => state.ui)

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 w-full sm:max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search candidates by name, email or phone..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            className="w-full pl-12 pr-4 py-2 rounded-xl bg-gray-800 text-gray-100 placeholder-gray-400 
                       border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          </div>
        </div>
      </div>

      {/* Sorting Dropdown */}
      <div className="sm:w-52">
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="w-full px-4 py-2 rounded-xl bg-gray-800 text-gray-100 border border-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
        >
          <option value="score">Sort by Score</option>
          <option value="name">Sort by Name</option>
          <option value="createdAt">Sort by Date</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>
    </div>
  )
}
