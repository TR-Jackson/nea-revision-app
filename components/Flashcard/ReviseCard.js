import axios from '../../lib/axiosConfig'
import PropTypes from 'prop-types'
import { useState } from 'react'

import Button from '../UI/Button/Button'

export default function ReviseCard ({ front, back, _id, next }) {
  const [revealed, setRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const responseHandler = async (q) => {
    setIsLoading(true)
    await axios.post('/flashcard/response', { flashcardId: _id, q: q })
    setIsLoading(false)
    setRevealed(false)
    next()
  }

  return (
    <div className='w-full flex flex-col items-center space-y-10 my-10'>
      <div className='w-4/5 h-4/5 bg-gray-50 shadow-lg p-40 border-2 border-black rounded-lg overflow-auto'>
        <div className='text-4xl'>{revealed ? back : front}</div>
      </div>
      {revealed
        ? <div>
          <Button
            isLoading={isLoading}
            onClick={() => responseHandler(1)}>1</Button>
          <Button
            isLoading={isLoading}
            onClick={() => responseHandler(2)}>2</Button>
          <Button
            isLoading={isLoading}
            onClick={() => responseHandler(3)}>3</Button>
          <Button
            isLoading={isLoading}
            onClick={() => responseHandler(4)}>4</Button>
          <Button
            isLoading={isLoading}
            onClick={() => responseHandler(5)}>5</Button>
        </div>
        : <Button onClick={() => setRevealed(true)}>Flip flashcard</Button>}
    </div>
  )
}

ReviseCard.propTypes = {
  front: PropTypes.string,
  back: PropTypes.string,
  _id: PropTypes.string,
  next: PropTypes.func
}
