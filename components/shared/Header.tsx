import React from 'react'
import {
  OrganizationSwitcher,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Logo from './Logo'
import ThemeButton from '../ui/ThemeButton'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='z-10 p-5'>
      <nav className='flex items-center justify-between'>
        <Logo text='Classroom Reactor' href='/reactor' image='/LogoDesignV2 - AltColors.png' />
        <div className='flex items-center justify-between gap-3'>
          <div className=''>
            <SignedOut>
              <Link href='/sign-in'>Sign In</Link>
            </SignedOut>
            <UserButton />
          </div>
          <OrganizationSwitcher
            appearance={{
              baseTheme: dark,
              elements: {
                organizationSwitcherTrigger: 'py-2 px-4'
              }
            }}
          />
          <ThemeButton />
        </div>
      </nav>
    </header>
  )
}

export default Header
