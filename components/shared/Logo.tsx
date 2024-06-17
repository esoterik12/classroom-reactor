import Link from 'next/link'
import Image from 'next/image'

interface ILogoProps {
  href: string
  image: string
  text: string
}

const Logo = ({ href, image, text }: ILogoProps) => {
  return (
    <div>
      <Link
        href={href}
        className='flex flex-row items-center gap-3 text-lg font-bold uppercase tracking-widest'
      >
        <Image src={image} alt={text} width={40} height={40} />
        <p className='text-primary-500 hidden sm:block'>{text}</p>
      </Link>
    </div>
  )
}

export default Logo
