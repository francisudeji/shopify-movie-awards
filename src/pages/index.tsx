import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import MovieList from '../components/MovieList'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import SearchInput from '../components/SearchInput'

export default function Home() {
  const [searchText, setSearchText] = useState<string>('')
  const { data: movies, status, error } = useFetch(searchText)

  function handleChange(e: React.SyntheticEvent<HTMLInputElement, Event>) {
    setSearchText(e.currentTarget.value)
  }

  return (
    <div className="container mx-auto p-3 font-karla-regular -mt-20">
      <div className="space-y-6">
        <h1 className="text-sw-yellow mx-auto block text-center text-6xl font-karla-bold">
          The Shoppies
        </h1>

        <SearchInput value={searchText} onChange={handleChange} clear={() => setSearchText('')} />

        {status === 'success' && movies !== null && (
          <div className="divide-y divide-gray-700 mt-6 rounded-lg overflow-hidden">
            {movies.map((movie) => (
              <MovieList movie={movie} key={movie.Title + movie.Year} />
            ))}
          </div>
        )}

        {status === 'loading' && <Spinner />}

        {status === 'error' && error !== null && <ErrorMessage error={error} />}
      </div>
    </div>
  )
}
