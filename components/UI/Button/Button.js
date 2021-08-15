import { useEffect } from "react";

export default function Button({
  danger = false,
  main = false,
  children,
  onClick,
  disabled = false,
}) {
  return (
    <button
      disabled={disabled}
      type="button"
      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${
        danger
          ? "hover:bg-red-700 focus:ring-red-500 bg-red-600"
          : main
          ? "hover:bg-blue-chill-700 focus:ring-blue-chill-500 bg-blue-chill-600"
          : " border-gray-300 shadow-sm bg-white text-base text-gray-700 hover:bg-gray-50  focus:ring-blue-chill-500 "
      } focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}