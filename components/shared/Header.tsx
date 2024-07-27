import React from 'react'
import { OrganizationSwitcher, SignedOut, UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Logo from './Logo'
import ThemeButton from '../ui/ThemeButton'
import Link from 'next/link'
import CustomButton from '../ui/CustomButton'

const Header = () => {
  return (
    <header className='z-10 px-4 py-5'>
      <nav className='flex items-center justify-between'>
        <Logo
          text='Classroom Reactor'
          href='/reactor/dashboard'
          image='/LogoDesignV2 - AltColors.png'
        />
        <div className='flex items-center justify-between gap-x-1 gap-y-3'>
          <ThemeButton />
          <SignedOut>
            <Link href='/sign-in'>
              <CustomButton>
                <p>Sign In</p>
              </CustomButton>
            </Link>
          </SignedOut>
          <UserButton />
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: 'py-2 px-4'
              }
            }}
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
