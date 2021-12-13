import PropTypes from 'prop-types'

import { FolderOpenIcon, BookOpenIcon } from '@heroicons/react/outline'

export default function Folder ({ name, description, boxStatus, openFolderHandler }) {
  return (
    <div
      className="bg-sky-400 sm:min-w-full p-2 my-6 flex m-auto shadow-md rounded-md mb-0 hover:bg-sky-300 h-auto lg:w-3/5 py-4 px-3"
    >
      <div className="ml-1">
        <FolderOpenIcon
          className="h-7 w-7  mr-2  cursor-pointer hover:text-gray-50"
          onClick={() => openFolderHandler(name)
          }
        />
        <BookOpenIcon
          className="h-7 w-7  mr-2 cursor-pointer hover:text-gray-50"
          onClick={() =>
            openFolderHandler(name, true)
          }
        />
      </div>
      <div className="flex flex-col text-left mx-1 min-w-auto">
        <p className="font-semibold text-xl">{name}</p>
        <p className="text-lg">{description}</p>
      </div>
      <div className="flex-grow flex my-auto justify-end space-x-4 pr-6">
        {boxStatus.map((count, i) => (
          <p key={i}>{count}</p>
        ))}
      </div>
    </div>
  )
}

Folder.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  boxStatus: PropTypes.arrayOf(PropTypes.number),
  openFolderHandler: PropTypes.func
}
