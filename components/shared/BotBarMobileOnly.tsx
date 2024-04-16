'use client'
import { sideBarLinks } from '@/lib/constants/sideBarLinks'
import NavLink from '../ui/NavLink'
import SelectIcon from '../icons/SelectIcon'

const BotBarMobileOnly = () => {
  return (
    <section className='bg-glassmorphism xs:px-7 fixed bottom-0 z-10 w-full rounded-t-3xl p-4 backdrop-blur-lg md:hidden'>
      <div className='xs:gap-5 flex flex-row items-center justify-between gap-3'>
        {sideBarLinks.map(item => (
          <div key={item.id} className='m-2 flex flex-col items-center gap-2'>
            <SelectIcon iconClasses='h-6 w-6' iconSelection={item.icon} />
            <NavLink className='text-subtle-medium text-light-1 text-sm max-sm:hidden' href={item.link}>{item.name}</NavLink>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BotBarMobileOnly
