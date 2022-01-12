import axios from '../../lib/axiosConfig'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'

import QInfo from './QInfo'
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'

export default function ReviseCard ({ front, back, _id, next }) {
  const [revealed, setRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showQInfo, setShowQInfo] = useState(false)

  const responseHandler = async (q) => {
    setIsLoading(true)
    await axios.post('/flashcard/response', { flashcardId: _id, q: q })
    setIsLoading(false)
    setRevealed(false)
    next()
  }

  return (
    <div className='w-full flex flex-col items-center space-y-10 my-10'>
      <div className={`w-4/5 h-4/5 bg-gray-50 shadow-lg p-40 border-2 border-black rounded-lg overflow-auto ${!revealed && 'hover:cursor-pointer hover:bg-gray-100'} `} onClick={() => !revealed ? setRevealed(true) : null}>
        <div className='text-4xl'>{revealed ? back : front}</div>
      </div>
      {revealed
        ? <div>
          <Button
            isLoading={isLoading}
            onClick={() => responseHandler(0)}>0</Button>
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
          <InformationCircleIcon className='w-7 h-7 inline stroke-gray-500 ml-2 hover:stroke-slate-700 hover:cursor-pointer' onClick={() => setShowQInfo(true)}/>
          <Modal
            show={showQInfo} onClose={() => setShowQInfo(false)}
            title="0-5 quality of response" info
            closeButton
          >
            <QInfo />
          </Modal>
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
