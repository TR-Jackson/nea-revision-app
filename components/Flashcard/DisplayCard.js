import PropTypes from 'prop-types'

import { TrashIcon } from '@heroicons/react/outline'

export default function DisplayCard ({ card, deleteFlashcardHandler }) {
  return (
    <div className="flex text-lg relative w-full">
      <div className="bg-sky-400 w-full py-11 px-10 grid grid-cols-2 gap-4 space-x-6 items-center rounded-lg divide-x divide-sky-600 mx-auto">
        <p className='min-w-auto whitespace-pre-line text-clip overflow-hidden'>{card.front}</p>
        <p className='min-w-auto whitespace-pre-line text-clip overflow-hidden'>{card.back}</p>
      </div>
      <div className="absolute right-0 bg-sky-600 h-full px-2 pt-1 rounded-r-lg grow-0 flex flex-col justify-center">
        {/* <PencilAltIcon
            className="h-9 w-9 cursor-pointer hover:text-sky-50"
            onClick={() => alert('Edit')} /> */}
        <TrashIcon
          className="h-9 w-9 cursor-pointer hover:text-sky-50"
          onClick={() => deleteFlashcardHandler(card._id)}
        />
      </div>
    </div>
  )
}

DisplayCard.propTypes = {
  card: PropTypes.object,
  deleteFlashcardHandler: PropTypes.func
}
