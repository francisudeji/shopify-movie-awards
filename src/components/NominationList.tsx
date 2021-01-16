import { FiThumbsDown } from 'react-icons/fi'
import { MovieInstance } from '../hooks/useFetch'

interface Props {
  nomination: MovieInstance
  setNominations: Function
}

export default function NominationList({ nomination, setNominations }: Props) {
  function handleWithdrawal() {
    setNominations((previousMovies: Array<MovieInstance>) => {
      return previousMovies.filter((currentNomination) => {
        return (
          currentNomination.Title !== nomination.Title && currentNomination.Year !== nomination.Year
        )
      })
    })
  }

  return (
    <li className="bg-gray-800 flex items-center justify-between p-4 text-white hover:bg-gray-700 space-x-4 flex-shrink-0">
      <div>
        <div className="text-md">{nomination.Title}</div>
        <span className="text-sw-yellow text-sm">{nomination.Year} movie</span>
      </div>
      <button
        onClick={handleWithdrawal}
        className="flex text-gray-200 items-center text-sm border border-gray-600 py-2 px-3 rounded-md space-x-2 hover:text-white focus:outline-none focus:text-white focus:ring-1 focus:ring-white"
      >
        <FiThumbsDown />
        <span>Withdraw</span>
      </button>
    </li>
  )
}
