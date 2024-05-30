import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ICreateDisplayCard {
  link: string
  image: string
  underlineColor: string
  children: React.ReactNode
}

const SearchCardContainer = ({ link, image, underlineColor, children }: ICreateDisplayCard) => {
  return (
    <article className='mb-4 mt-2 flex h-20 w-full flex-col rounded-xl px-4 shadow-md transition-colors duration-150 hover:shadow-lg sm:px-7'>
      <Link href={link}>
        <div className='flex items-start justify-between'>
          <div className='gap-4 mt-3'>
            <div className='h-30 p-1 rounded-full'>
              <Image
                src={image}
                alt='image'
                width={40}
                height={40}
                className='mb-1'
              />
            </div>
            <div className={`h-1 w-full ${underlineColor}`}></div>
          </div>
          <div className='mt-4 flex flex-1 flex-row justify-between'>
            {children}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default SearchCardContainer
