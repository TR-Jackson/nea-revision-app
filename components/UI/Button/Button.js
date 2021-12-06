import { useState, useEffect } from "react";

export default function Button({
  danger = false,
  main = false,
  children,
  onClick,
  disabled = false,
  submitted,
}) {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setHasSubmitted(submitted || hasSubmitted);
  }, [submitted, hasSubmitted]);

  return hasSubmitted ? (
    <div className="spinner" />
  ) : (
    <button
      disabled={disabled}
      type="button"
      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${
        disabled
          ? "border-gray-300 bg-gray-400 text-gray-300 cursor-not-allowed"
          : danger
          ? "hover:bg-red-700 focus:ring-red-500 bg-red-600"
          : main
          ? "hover:bg-blue-chill-700 focus:ring-blue-chill-500 bg-blue-chill-600"
          : " border-gray-300 shadow-sm bg-white text-base text-gray-700 hover:bg-gray-50  focus:ring-blue-chill-500 "
      } focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
