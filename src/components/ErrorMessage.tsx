import type { ErrorInstance } from '../hooks/useFetch'

export default function ErrorMessage({ error }: { error: ErrorInstance }) {
  return (
    <div className="flex items-center justify-center text-center text-3xl text-red-500 uppercase">
      {error.message}
    </div>
  )
}
