import { FiSearch, FiX } from 'react-icons/fi'

interface Props {
  value: string
  onChange: (e: React.SyntheticEvent<HTMLInputElement, Event>) => void
  clear: () => void
}

export default function SearchInput({ value, onChange, clear }: Props) {
  return (
    <div className="relative">
      <span className="absolute top-0 left-0 ml-4 text-white mt-5 sm:mt-3 pt-1">
        <FiSearch />
      </span>
      <input
        className="block w-full bg-gray-800 placeholder-gray-500 text-white px-12 py-5 sm:py-3 outline-none rounded-full"
        placeholder="Type to search..."
        role="search"
        value={value}
        onChange={onChange}
      />
      {value.length > 0 && (
        <button
          onClick={clear}
          className="absolute top-0 right-0 mr-4 text-white mt-5 sm:mt-3 pt-1"
        >
          <FiX />
        </button>
      )}
    </div>
  )
}
