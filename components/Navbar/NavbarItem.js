import Link from 'next/link'
import PropTypes from 'prop-types'

export default function NavbarItem ({ text, href, onClick }) {
  if (href) {
    return (
      <Link href={href}>
        <a className="text-gray-50 font-semibold text-lg hover:text-sky-300">
          {text}
        </a>
      </Link>
    )
  }
  if (onClick) {
    return (
      <div
        className="text-gray-50 font-semibold text-lg cursor-pointer hover:text-sky-300"
        onClick={onClick}
      >
        {text}
      </div>
    )
  }
  return (
    <div className="text-gray-50 font-semibold text-lg cursor-pointer hover:text-sky-300">
      {text}
    </div>
  )
}

NavbarItem.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func
}
