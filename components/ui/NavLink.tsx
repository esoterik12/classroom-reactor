'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

interface NavLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

const NavLink = ({ href, children, className, ...props }: NavLinkProps) => {
  const pathname = usePathname()

  const isActiveLink = href.split('/')[2].startsWith(pathname.split('/')[2])

  return (
    <Link
      {...props}
      href={href}
      className={`flex flex-row gap-2  transition-colors duration-150 hover:text-primary-500 ${clsx(className, isActiveLink && 'text-primary-500 underline')}`}
    >
      {children}
    </Link>
  )
}

export default NavLink
