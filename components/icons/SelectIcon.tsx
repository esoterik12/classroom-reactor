// This is used for dynamically rendering icons in list pages depending on json data
import CheckMark from './IconCheckMark'
import IconAddress from './IconAddress'
import IconDelivery from './IconDelivery'
import IconEmail from './IconEmail'
import IconMusic from './IconMusic'
import IconPhoto from './IconPhoto'
import IconShow from './IconShow'
import IconStars from './IconStars'
import IconTelephone from './IconTelephone'
import IconPlus from './IconPlus'
import IconCart from './IconCart'
import IconWeb from './IconWeb'
import IconRightArrowCircle from './IconRightArrowCircle'
import IconLeftArrowCircle from './IconLeftArrowCircle'
import IconX from './IconX'
import IconXCircle from './IconXCircle'
import IconAcademicCap from './IconAcademicCap'
import IconUser from './IconUser'
import IconDocumentPlus from './IconDocumentPlus'
import IconChat from './IconChat'
import IconEye from './IconEye'
import IconDashboard from './IconDashboard'
// Socials:
import IconFacebook from './social-icons/IconFacebook'
import IconGithub from './social-icons/IconGithub'
import IconInstagram from './social-icons/IconInstagram'
import IconHome from './IconHome'
import IconSoundcloud from './social-icons/IconSoundcloud'
import IconGlobe from './IconGlobe'
import IconReply from './IconReply'
import IconHeart from './IconHeart'
import IconDelete from './IconDelete'
import IconShare from './IconShare'
import IconBackArrow from './IconBackArrow'
import IconForwardArrow from './IconForwardArrow'
import IconSearch from './IconSearch'
import IconEdit from './IconEdit'
import IconUserGroup from './IconUserGroup'
import IconBars from './IconBars'
import IconUserPlus from './IconUserPlus'
import IconUserMinus from './IconUserMinus'
// RTE Icons
import IconAlignCenterRTE from './rte-icons/IconAlignCenterRTE'
import IconBoldRTE from './rte-icons/IconBoldRTE'
import IconItalicRTE from './rte-icons/IconItalicRTE'
import IconUnderlineRTE from './rte-icons/IconUnderlineRTE'
import IconCodeRTE from './rte-icons/IconCodeRTE'
import IconAlignLeftRTE from './rte-icons/IconAlignLeftRTE'
import IconAlignRightRTE from './rte-icons/IconAlignRightRTE'
import IconAlignJustifyRTE from './rte-icons/IconAlignJustifyRTE'
import IconQuoteRTE from './rte-icons/IconQuoteRTE'
import IconOrderedListRTE from './rte-icons/IconOrderedListRTE'
import IconUnorderedListRTE from './rte-icons/IconUnorderedListRTE'
import IconReactJS from './stack-logos/IconReactJS'
import IconNextJS from './stack-logos/IconNextJS'
import IconMongoDB from './stack-logos/IconMongoDB'
import IconTailwind from './stack-logos/IconTailwind'
import IconTypeScript from './stack-logos/IconTypeScript'

interface ISelectIconProps {
  iconSelection: string
  iconClasses: string
}

export default function SelectIcon({
  iconSelection,
  iconClasses
}: ISelectIconProps) {
  let icon

  switch (iconSelection) {
    case 'check':
      icon = <CheckMark classes={iconClasses} />
      break
    case 'address':
      icon = <IconAddress classes={iconClasses} />
      break
    case 'delivery':
      icon = <IconDelivery classes={iconClasses} />
      break
    case 'email':
      icon = <IconEmail classes={iconClasses} />
      break
    case 'music':
      icon = <IconMusic classes={iconClasses} />
      break
    case 'photo':
      icon = <IconPhoto classes={iconClasses} />
      break
    case 'show':
      icon = <IconShow classes={iconClasses} />
      break
    case 'stars':
      icon = <IconStars classes={iconClasses} />
      break
    case 'telephone':
      icon = <IconTelephone classes={iconClasses} />
      break
    case 'home':
      icon = <IconHome classes={iconClasses} />
      break
    case 'plus':
      icon = <IconPlus classes={iconClasses} />
      break
    case 'cart':
      icon = <IconCart classes={iconClasses} />
      break
    case 'web':
      icon = <IconWeb classes={iconClasses} />
      break
    case 'facebook':
      icon = <IconFacebook classes={iconClasses} />
      break
    case 'instagram':
      icon = <IconInstagram classes={iconClasses} />
      break
    case 'github':
      icon = <IconGithub classes={iconClasses} />
      break
    case 'soundcloud':
      icon = <IconSoundcloud classes={iconClasses} />
      break
    case 'rightArrowCircle':
      icon = <IconRightArrowCircle classes={iconClasses} />
      break
    case 'leftArrowCircle':
      icon = <IconLeftArrowCircle classes={iconClasses} />
      break
    case 'x':
      icon = <IconX classes={iconClasses} />
      break
    case 'xCircle':
      icon = <IconXCircle classes={iconClasses} />
      break
    case 'academic':
      icon = <IconAcademicCap classes={iconClasses} />
      break
    case 'documentPlus':
      icon = <IconDocumentPlus classes={iconClasses} />
      break
    case 'user':
      icon = <IconUser classes={iconClasses} />
      break
    case 'chat':
      icon = <IconChat classes={iconClasses} />
      break
    case 'eye':
      icon = <IconEye classes={iconClasses} />
      break
    case 'globe':
      icon = <IconGlobe classes={iconClasses} />
      break
    case 'dashboard':
      icon = <IconDashboard classes={iconClasses} />
      break
    case 'reply':
      icon = <IconReply classes={iconClasses} />
      break
    case 'heart':
      icon = <IconHeart classes={iconClasses} />
      break
    case 'delete':
      icon = <IconDelete classes={iconClasses} />
      break
    case 'share':
      icon = <IconShare classes={iconClasses} />
      break
    case 'back':
      icon = <IconBackArrow classes={iconClasses} />
      break
    case 'forward':
      icon = <IconForwardArrow classes={iconClasses} />
      break
    case 'search':
      icon = <IconSearch classes={iconClasses} />
      break
    case 'edit':
      icon = <IconEdit classes={iconClasses} />
      break
    case 'users':
      icon = <IconUserGroup classes={iconClasses} />
      break
    case 'bars':
      icon = <IconBars classes={iconClasses} />
      break
    case 'userPlus':
      icon = <IconUserPlus classes={iconClasses} />
      break
    case 'userMinus':
      icon = <IconUserMinus classes={iconClasses} />
      break
    case 'centerRTE':
      icon = <IconAlignCenterRTE classes={iconClasses} />
      break
    case 'leftRTE':
      icon = <IconAlignLeftRTE classes={iconClasses} />
      break
    case 'rightRTE':
      icon = <IconAlignRightRTE classes={iconClasses} />
      break
    case 'justifyRTE':
      icon = <IconAlignJustifyRTE classes={iconClasses} />
      break
    case 'boldRTE':
      icon = <IconBoldRTE classes={iconClasses} />
      break
    case 'italicRTE':
      icon = <IconItalicRTE classes={iconClasses} />
      break
    case 'underlineRTE':
      icon = <IconUnderlineRTE classes={iconClasses} />
      break
    case 'codeRTE':
      icon = <IconCodeRTE classes={iconClasses} />
      break
    case 'quoteRTE':
      icon = <IconQuoteRTE classes={iconClasses} />
      break
    case 'orderedRTE':
      icon = <IconOrderedListRTE classes={iconClasses} />
      break
    case 'unorderedRTE':
      icon = <IconUnorderedListRTE classes={iconClasses} />
      break
    case 'reactjs':
      icon = <IconReactJS classes={iconClasses} />
      break
    case 'nextjs':
      icon = <IconNextJS classes={iconClasses} />
      break
    case 'mongodb':
      icon = <IconMongoDB classes={iconClasses} />
      break
    case 'tailwind':
      icon = <IconTailwind classes={iconClasses} />
      break
    case 'typescript':
      icon = <IconTypeScript classes={iconClasses} />
      break
    default:
      icon = <p className='text-red-500'>Error: No Icon Found</p>
  }

  return <>{icon}</>
}
