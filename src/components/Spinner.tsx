import { FaSpinner } from 'react-icons/fa'

export default function Spinner() {
  return (
    <div className="flex mt-6 items-center justify-center text-center">
      <FaSpinner className="animate-spin text-sw-yellow text-5xl transform rotate-180 rinfini" />
    </div>
  )
}
