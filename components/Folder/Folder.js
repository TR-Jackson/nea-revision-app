import PropTypes from 'prop-types'

import { FolderOpenIcon, BookOpenIcon } from '@heroicons/react/outline'

export default function Folder ({ name, description, revisedStatus, openFolderHandler, toRevise }) {
  return (
    <div className="relative flex justify-center">
      <div
        className={`${toRevise && 'border-2 border-sky-800'} lg:max-w-4/5 m-1 bg-sky-400 sm:min-w-full p-2 flex shadow-md rounded-md mb-0 hover:bg-sky-300 h-auto lg:w-3/5 py-4 px-3`}
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
        <div className="flex flex-col truncate text-left mx-1 w-auto">
          <p className="font-semibold truncate text-xl grow-0">{name}</p>
          <p className="text-lg truncate grow">{description}</p>
        </div>
        <div className="flex-grow flex my-auto justify-end space-x-4 pr-6 shrink-0">
          {revisedStatus.map((count, i) => (
            <p key={i}>{count}</p>
          ))}
        </div>
      </div>
      {toRevise && <div className="w-auto justify-end flex">
        <div className="h-3 w-3 rounded-full bg-sky-800 absolute"></div>
        <div className="h-3 w-3 rounded-full bg-sky-800 absolute animate-ping inline-flex"></div>
      </div>}
    </div>
  )
}

Folder.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  revisedStatus: PropTypes.arrayOf(PropTypes.number),
  openFolderHandler: PropTypes.func,
  toRevise: PropTypes.bool
}
