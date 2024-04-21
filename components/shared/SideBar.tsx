'use client'
import { sideBarLinks } from '@/lib/constants/sideBarLinks'
import NavLink from '../ui/NavLink'
import SelectIcon from '../icons/SelectIcon'
import { usePathname, useRouter } from 'next/navigation'
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs'

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <div className='sticky flex h-screen flex-col border-r max-md:hidden'>
      {sideBarLinks.map(item => {
        
        if (item.link === "/reactor/profile") item.link = `${item.link}/${userId}`
        return (
          <div key={item.id} className='m-3 flex flex-row gap-2 lg:m-5'>
            <SelectIcon iconClasses='h-6 w-6' iconSelection={item.icon} />
            <NavLink href={item.link}>{item.name}</NavLink>
          </div>
        )
      })}
    </div>
  )
}

export default SideBar
