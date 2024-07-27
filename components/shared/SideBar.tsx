import { sideBarLinks } from '@/lib/constants/sideBarLinks'
import NavLink from '../ui/NavLink'
import SelectIcon from '../icons/SelectIcon'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'

const SideBar = async () => {
  const user = await currentUser()
  if (!user) return null

  const userInfo = await fetchUser(user.id)

  return (
    <div className='sticky flex h-screen flex-col border-r max-md:hidden'>
      {sideBarLinks.map(item => {
        if (item.link === '/reactor/profile')
          item.link = `${item.link}/${user.id}?p=1`
        return (
          <div key={item.id} className='m-3 flex flex-row gap-2'>
            <NavLink href={item.link}>
              <SelectIcon
                iconClasses='h-6 w-6 mt-0.5'
                iconSelection={item.icon}
              />
              {item.name}
            </NavLink>
          </div>
        )
      })}
      {userInfo.permissions === 'admin' && (
        <div className='m-3 flex flex-row gap-2'>
          <NavLink href='/reactor/admin'>
            <SelectIcon iconClasses='h-6 w-6 mt-0.5' iconSelection='show' />
            <p>Admin</p>
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default SideBar
