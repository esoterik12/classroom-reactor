'use client'
import { sideBarLinks } from '@/lib/constants/sideBarLinks'
import NavLink from '../ui/NavLink'
import SelectIcon from '../icons/SelectIcon'

const SideBar = () => {
  return (
    <div className='sticky flex h-screen w-fit flex-col overflow-auto border-r pb-5 pt-6 max-md:hidden'>
      {sideBarLinks.map(item => (
        <div key={item.id} className='m-5 flex flex-row gap-2'>
          <SelectIcon iconClasses='h-6 w-6' iconSelection={item.icon} />
          <NavLink href={item.link}>{item.name}</NavLink>
        </div>
      ))}
    </div>
  )
}

export default SideBar
