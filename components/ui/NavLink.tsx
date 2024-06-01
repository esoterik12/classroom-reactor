'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

interface INavLink {
  href: string
  className?: string
  children: React.ReactNode
}

const NavLink = ({ href, children, className, ...props }: INavLink) => {
  const pathname = usePathname()

  const isActiveLink = href.split('/')[2].startsWith(pathname.split('/')[2])

  return (
    <Link
      {...props}
      href={href}
      className={clsx(className, isActiveLink && 'text-primary-500 underline')}
    >
      {children}
    </Link>
  )
}

export default NavLink
