import Link from 'next/link'

interface TextLinkProps {
  children: React.ReactNode
  href: string
  className?: string
}

const TextLink = ({ children, href, className, ...props }: TextLinkProps) => {
  return (
    <Link
      href={href}
      className={`${className} transition-colors duration-150 hover:text-primary-300`}
      {...props}
    >
      {children}
    </Link>
  )
}

export default TextLink
