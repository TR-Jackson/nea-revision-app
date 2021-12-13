import PropTypes from 'prop-types'

import Button from '../UI/Button/Button'

export default function FolderInfo ({ name, description, deleteFolderHandler, isLoading }) {
  return (
    <>
      <title>Revision App - {name}</title>
      <div className="flex bg-sky-200 rounded-md p-5 w-3/4 mx-auto shadow-md">
        <div className="flex flex-col flex-grow justify-center font-semibold text-lg space-y-2">
          <p className="text-4xl font-bold">{name}</p>
          <p className="text-2xl">{description}</p>
        </div>
        <div className="flex flex-col space-y-4 mx-2">
          <Button isLoading={isLoading} danger onClick={deleteFolderHandler}>
            DELETE FOLDER
          </Button>
          <Button main onClick={() => alert('Guys trust me this website is finished')}>
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
  isLoading: PropTypes.bool
}
