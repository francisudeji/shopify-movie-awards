import { MovieInstance } from './useFetch'

interface DataInstance {
  searchText: string
  nominatedMovies: Array<MovieInstance>
}
export default function useShare() {
  function encode(data: DataInstance): string {
    return btoa(JSON.stringify(data))
  }

  function decode(str: string): DataInstance {
    return JSON.parse(atob(str))
  }

  return { encode, decode }
}
