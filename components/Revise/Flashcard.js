import axios from '../../lib/axiosConfig'
import PropTypes from 'prop-types'
import { useState } from 'react'

import Button from '../UI/Button/Button'

export default function Flashcard ({ front, back, _id, next }) {
  const [revealed, setRevealed] = useState(false)

  const responseHandler = async (correct) => {
    await axios.post('/flashcard/response', { flashcardId: _id, correct: correct })
    setRevealed(false)
    next()
  }

  return (
    <div className='w-full flex flex-col items-center space-y-10 my-10'>
      <div className='w-4/5 h-4/5 bg-gray-100 shadow-lg p-40'>
        <div>{revealed ? back : front}</div>
      </div>
      {revealed
        ? <div>
          <Button onClick={() => responseHandler(true)}>Correct</Button>
          <Button onClick={() => responseHandler(false)}>Incorrect</Button>
        </div>
        : <Button onClick={() => setRevealed(true)}>Flip flashcard</Button>}
    </div>
  )
}

Flashcard.propTypes = {
  front: PropTypes.string,
  back: PropTypes.string,
  _id: PropTypes.string,
  next: PropTypes.func
}
