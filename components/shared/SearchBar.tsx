'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ActiveButtonsToggle from '../ui/ActiveButtonsToggle'

interface ISearchBar {
  inputClasses: string
}

const SearchBar = ({ inputClasses }: ISearchBar) => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState('users')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const query = new URLSearchParams({
        q: search,
        type: searchType
      }).toString()
      if (search) {
        router.push(`/reactor/search?${query}`)
      }
    }, 500)
    
    return () => clearTimeout(delayDebounceFn)
  }, [search, searchType, router])

  return (
    <div className=''>
      <ActiveButtonsToggle
        searchType={searchType}
        setSearchType={setSearchType}
      />
      <input
        id='text'
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={`${inputClasses} focus:border-transparent m-4 mt-6 block min-w-80 rounded-md border border-gray-300 p-1 shadow focus:outline-none focus:ring-2 focus:ring-secondary-500`}
        placeholder={`Search ${searchType}`}
      />
    </div>
  )
}

export default SearchBar
