import axios, { AxiosResponse, AxiosError } from 'axios'
import { useState, useEffect } from 'react'

type StatusInstance = 'idle' | 'loading' | 'error' | 'success'

interface DataInstance {
  Title: string
  Year: string
}

export default function useFetch(search: string) {
  const [status, setStatus] = useState<StatusInstance>('idle')
  const [data, setData] = useState<DataInstance[] | null>(null)
  const [error, setError] = useState<AxiosError | Error | null>(null)
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
        `${process.env.NEXT_PUBLIC_API_URL}/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&s=${debouncedValue}`
      )
      .then(
        ({ data }: AxiosResponse) => {
          if (data.Response === 'False') {
            setStatus('error')
            setError({ message: data.Error, name: 'NOT_FOUND' })
            return
          }
          setStatus('success')
          setData(data.Search)
        },
        (err: AxiosError | Error) => {
          setStatus('error')
          setError(err)
        }
      )
  }, [debouncedValue])

  return { status, data, error }
}
