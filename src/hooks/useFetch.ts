import axios, { AxiosResponse, AxiosError } from 'axios'
import { useState, useEffect } from 'react'

type StatusInstance = 'idle' | 'loading' | 'error' | 'success'
export type ErrorInstance = AxiosError | Error
export interface MovieInstance {
  Title: string
  Year: string
  Type: 'movie'
}

export default function useFetch(search: string) {
  const [status, setStatus] = useState<StatusInstance>('success')
  const [data, setData] = useState<Array<MovieInstance> | null>(null)
  const [error, setError] = useState<ErrorInstance | null>(null)
  const [debouncedValue, setDebouncedValue] = useState<string>(search)

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(search)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [search])

  useEffect(() => {
    if (!debouncedValue) {
      return
    }

    setStatus('loading')
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${debouncedValue}`,
        { timeout: 120000 }
      )
      .then(
        ({ data }: AxiosResponse) => {
          if (data.Response === 'False') {
            setStatus('error')
            setError({ message: data.Error, name: 'NOT_FOUND' })
            return
          }
          setStatus('success')

          const movies = data.Search.filter((movie: MovieInstance) => movie.Type === 'movie')
          setData(movies)
        },
        (err: ErrorInstance) => {
          setStatus('error')
          setError(err)
        }
      )
  }, [debouncedValue])

  return { status, data, error }
}
