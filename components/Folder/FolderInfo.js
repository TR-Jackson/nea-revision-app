import PropTypes from 'prop-types'

import Button from '../UI/Button/Button'

export default function FolderInfo ({ name, description, deleteFolderHandler, isLoading, editFolderHandler }) {
  return (
    <>
      <title>Revision App - {name}</title>
      <div className="flex bg-sky-200 rounded-md p-5 w-3/4 mx-auto shadow-md text-center justify-evenly">
        <div className="flex-col justify-center font-semibold text-lg space-y-2 w-2/3">
          <p className="text-4xl font-bold whitespace-pre-line text-clip overflow-hidden grow-0">{name}</p>
          <p className="text-2xl whitespace-pre-line text-clip overflow-hidden grow-0">{description}</p>
        </div>
        <div className="flex flex-col space-y-4 mx-2 shrink-0 justify-evenly w-auto">
          <Button
            isLoading={isLoading}
            danger
            onClick={deleteFolderHandler}>
            DELETE FOLDER
          </Button>
          <Button
            main
            onClick={editFolderHandler}>
            EDIT FOLDER
          </Button>
        </div>
      </div>
    </>
  )
}

FolderInfo.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  deleteFolderHandler: PropTypes.func,
  editFolderHandler: PropTypes.func,
  isLoading: PropTypes.bool
}
