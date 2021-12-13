import PropTypes from 'prop-types'

import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'

export default function DisplayCard ({ card, deleteFlashcardHandler }) {
  return (
    <div className="flex my-6 text-lg">
      <div className="bg-sky-400 w-full py-11 px-10 grid grid-cols-2 gap-4 space-x-6 items-center rounded-l-lg divide-x divide-sky-600 mx-auto">
        <p className='overflow-auto'>{card.front}</p>
        <p className='overflow-auto'>{card.back}</p>
      </div>
      <div className="bg-sky-600 m-auto h-32 px-2 rounded-r-lg">
        <div className="flex flex-col justify-evenly h-full">
          <PencilAltIcon className="h-9 w-9 cursor-pointer hover:text-sky-50" onClick={() => alert('Guys trust me this website is finished')} />
          <TrashIcon
            className="h-9 w-9 cursor-pointer hover:text-sky-50"
            onClick={() => deleteFlashcardHandler(card._id)}
          />
        </div>
      </div>
    </div>
  )
}

DisplayCard.propTypes = {
  card: PropTypes.object,
  deleteFlashcardHandler: PropTypes.func
}
