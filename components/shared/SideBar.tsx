'use client'
import { sideBarLinks } from '@/lib/constants/sideBarLinks'
import NavLink from '../ui/NavLink'
import SelectIcon from '../icons/SelectIcon'
import { useAuth } from '@clerk/nextjs'

const SideBar = () => {
  const { userId } = useAuth();

  return (
    <div className='sticky flex h-screen flex-col border-r max-md:hidden'>
      {sideBarLinks.map(item => {
        
        if (item.link === "/reactor/profile") item.link = `${item.link}/${userId}?p=1`
        return (
          <div key={item.id} className='m-3 flex flex-row gap-2'>
            <SelectIcon iconClasses='h-6 w-6' iconSelection={item.icon} />
            <NavLink href={item.link}>{item.name}</NavLink>
          </div>
        )
      })}
    </div>
  )
}

export default SideBar
