import { FiThumbsUp } from 'react-icons/fi'
import { MovieInstance } from '../hooks/useFetch'

export default function MovieList({ movie }: { movie: MovieInstance }) {
  return (
    <li className="bg-gray-800 flex items-center justify-between p-4 text-white hover:bg-gray-700">
      <div>
        <div className="text-md">{movie.Title}</div>
        <span className="text-sw-yellow text-sm">{movie.Year} movie</span>
      </div>
      <button className="flex text-gray-200 items-center text-sm border border-gray-600 py-2 px-3 rounded-md space-x-2 hover:text-white focus:outline-none focus:text-white focus:ring-1 focus:ring-white">
        <FiThumbsUp />
        <span>Nomitate</span>
      </button>
    </li>
  )
}
