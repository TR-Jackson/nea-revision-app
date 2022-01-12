import PropTypes from 'prop-types'

export default function Button ({
  danger = false,
  main = false,
  children,
  onClick,
  disabled = false,
  isLoading = false
}) {
  return (
    <button
      disabled={disabled || isLoading}
      type="button"
      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium ${
        disabled || isLoading
          ? 'border-gray-300 bg-gray-400 text-gray-300 cursor-not-allowed'
          : danger
            ? 'hover:bg-red-700 focus:ring-red-500 bg-red-600 text-white'
            : main
              ? 'hover:bg-sky-700 focus:ring-sky-500 bg-sky-600 text-white'
              : ' border-gray-300 shadow-sm bg-white text-base text-gray-700 hover:bg-gray-50  focus:ring-sky-500 '
      } focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm ${isLoading && 'cursor-progress'}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  danger: PropTypes.bool,
  main: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool
}
