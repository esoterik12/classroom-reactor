import Link from 'next/link'
import Image from 'next/image'

interface ILogoProps {
  href: string
  image: string
  text: string
}

const Logo = ({ href, image, text }: ILogoProps) => {
  return (
    <div className='hidden sm:block'>
      <Link
        href={href}
        className='flex flex-row items-center gap-4 text-2xl font-bold uppercase tracking-widest'
      >
        <Image src={image} alt={text} width={40} height={40} />
        <p>{text}</p>
      </Link>
    </div>
  )
}

export default Logo
