import Link from 'next/link'

export default function NavbarItem ({ text, href, onClick }) {
  if (href) {
    return (
      <Link href={href}>
        <a className="text-gray-50 font-semibold text-lg hover:text-blue-chill-300">
          {text}
        </a>
      </Link>
    )
  }
  if (onClick) {
    return (
      <div
        className="text-gray-50 font-semibold text-lg cursor-pointer hover:text-blue-chill-300"
        onClick={onClick}
      >
        {text}
      </div>
    )
  }
  return (
    <div className="text-gray-50 font-semibold text-lg cursor-pointer hover:text-blue-chill-300">
      {text}
    </div>
  )
}
