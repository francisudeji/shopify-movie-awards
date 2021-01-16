import { useEffect, useState } from 'react'
import useFetch, { MovieInstance } from '../hooks/useFetch'
import MovieList from '../components/MovieList'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import SearchInput from '../components/SearchInput'
import NominationList from '../components/NominationList'
import { FiChevronDown, FiShare2 } from 'react-icons/fi'
import useShare from '../hooks/useShare'
import { useRouter } from 'next/router'

export default function Home() {
  const [copied, setCopied] = useState<true | false>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [nominations, setNominations] = useState<Array<MovieInstance>>([])
  const { data: movies, status, error } = useFetch(searchText)
  const { encode, decode } = useShare()
  const router = useRouter()

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false)
      }, 3000)
    }

    return () => clearTimeout(timeout)
  }, [copied])

  useEffect(() => {
    const code = router.query.code
    if (!code) return

    console.log(code)

    const data = decode(code as string)

    setSearchText(data.searchText)
    setNominations(data.nominatedMovies)
  }, [router.query])

  function handleChange(e: React.SyntheticEvent<HTMLInputElement, Event>) {
    setSearchText(e.currentTarget.value)
  }

  function handleShare() {
    const code = encode({ searchText, nominatedMovies: nominations })

    const text = `${window.location.origin}/?code=${code}`

    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true)
      },
      (err) => {
        throw Error(err.message)
      }
    )
  }

  return (
    <div className="container mx-auto p-3 font-karla-regular -mt-20">
      <div className="space-y-6">
        <div className="flex items-end justify-between space-x-4">
          <h1 className="text-sw-yellow mx-auto block text-center text-6xl font-karla-bold">
            The Shoppies
          </h1>

          {nominations.length > 0 && (
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-200 text-sm border border-gray-600 py-2 px-3 rounded-md space-x-2 hover:text-white focus:outline-none focus:text-white focus:ring-1 focus:ring-white"
            >
              <FiShare2 />
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
          )}
        </div>

        <SearchInput value={searchText} onChange={handleChange} clear={() => setSearchText('')} />

        {status === 'success' && movies !== null && (
          <div className="grid grid-rows-1">
            <div className="grid grid-cols-2 gap-4">
              <a
                href="#movies"
                className="text-white flex items-center space-x-2 font-semibold text-lg"
              >
                <span>
                  {movies.length} search result{movies.length > 1 ? 's' : null} for "{searchText}"
                </span>
                <FiChevronDown />
              </a>
              {nominations.length > 0 && (
                <a
                  href="#nominations"
                  className="text-white flex items-center space-x-2 font-semibold text-lg"
                >
                  <span>Nominations({nominations.length})</span>
                  <FiChevronDown />
                </a>
              )}
            </div>
            <div
              className={`grid ${
                nominations.length > 0 ? 'grid-rows-1 sm:grid-cols-2' : 'grid-row-1'
              } gap-4`}
            >
              <ul
                id="movies"
                className="divide-y list-none divide-gray-700 mt-6 rounded-lg overflow-hidden"
              >
                {movies.map((movie) => (
                  <MovieList
                    movie={movie}
                    key={movie.Title + movie.Year}
                    nominations={nominations}
                    setNominations={setNominations}
                  />
                ))}
              </ul>

              {nominations.length > 0 && (
                <div>
                  <ul
                    id="nominations"
                    className="divide-y list-none divide-gray-700 mt-6 rounded-lg overflow-hidden"
                  >
                    {nominations.map((nomination) => (
                      <NominationList
                        nomination={nomination}
                        setNominations={setNominations}
                        key={nomination.Title + nomination.Year}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {status === 'loading' && <Spinner />}

        {status === 'error' && error !== null && <ErrorMessage error={error} />}
      </div>
    </div>
  )
}
