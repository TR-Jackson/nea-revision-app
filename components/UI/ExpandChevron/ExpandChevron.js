import PropTypes from 'prop-types'

export default function ExpandChevron ({ expanded, onToggle }) {
  return (
    <svg
      className={`m-0 w-auto text-black h-auto hover:text-sky-50 transiton delay-0 duration-100 transform ${
        expanded ? 'rotate-90' : 'rotate-0'
      }`}
      onClick={onToggle}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}

ExpandChevron.propTypes = {
  expanded: PropTypes.bool,
  onToggle: PropTypes.func
}
