import { FiThumbsUp } from 'react-icons/fi'
import { MovieInstance } from '../hooks/useFetch'

interface Props {
  movie: MovieInstance
  nominations: Array<MovieInstance>
  setNominations: Function
}

export default function MovieList({ movie, nominations, setNominations }: Props) {
  // We check for both `Title` and `Year` because
  // some movies have the exact same name, but different release year
  // e.g `spiderman`
  const isAlreadyNominated =
    nominations.filter(
      (nomination) => nomination.Title === movie.Title && nomination.Year === movie.Year
    ).length > 0

  function handleNomination() {
    if (nominations.length > 4) return

    setNominations((previousMovies: Array<MovieInstance>) => {
      return [movie, ...previousMovies]
    })
  }

  return (
    <li className="bg-gray-800 flex items-center justify-between p-4 text-white hover:bg-gray-700 space-x-4 flex-shrink-0">
      <div>
        <div className="text-md">{movie.Title}</div>
        <span className="text-sw-yellow text-sm">{movie.Year} movie</span>
      </div>
      <button
        disabled={isAlreadyNominated}
        onClick={handleNomination}
        className="flex text-gray-200 items-center text-sm border border-gray-600 py-2 px-3 rounded-md space-x-2 hover:text-white focus:outline-none focus:text-white focus:ring-1 focus:ring-white"
      >
        <FiThumbsUp />
        <span>Nominate</span>
      </button>
    </li>
  )
}
