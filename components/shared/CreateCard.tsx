// Initially only for display and link purposes
import Link from 'next/link'
import SelectIcon from '../icons/SelectIcon'
import CreateCardPopover from './CreateCardPopover'

type ICreateCard = {
  title: string
  details: string[]
  content: IContent[]
  link: string
  icon: string
}

type IContent = {
  name: string
  link: string
  description: string
}

const CreateCard = ({ title, details, link, icon, content }: ICreateCard) => {
  return (
    <div className='flex w-full flex-col justify-between rounded-md border border-grayLight-500 shadow-md dark:border-jet-500'>
      {/* Main Header Div */}
      <div
        className='flex h-16 w-full flex-row items-center justify-between gap-1 rounded-md bg-grayLight-500
       text-jet-500'
      >
        <div className='flew-row flex gap-2'>
          <SelectIcon iconClasses='h-6 w-6 ml-4' iconSelection={icon} />
          <h1 className=' text-center text-lg font-medium '>{title}</h1>
        </div>
        <div className=''>
          <CreateCardPopover />
        </div>
      </div>
      {/* Content Container */}
      <div className='flex flex-col gap-6 p-4 md:flex-row'>
        <div className='w-44'>
          <p className='mb-1 text-sm text-gray-700 '>Favorites: </p>
          <ul className='w-44'>
            {content.map(item => (
              <li key={item.name} className='text-gray mt-1'>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className='mb-1 text-sm text-gray-700 '>Trending: </p>
          <ul className='w-44'>
            {content.map(item => (
              <li key={item.name} className='text-gray mt-1'>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className='mb-1 text-sm text-gray-700 '>More: </p>
          <ul className='w-44'>
            {content.map(item => (
              <li key={item.name} className='text-gray mt-1'>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CreateCard
