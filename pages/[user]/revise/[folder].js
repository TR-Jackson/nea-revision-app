import axios from '../../../lib/axiosConfig'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ReviseCard from '../../../components/Flashcard/ReviseCard'
import useUser from '../../../hooks/useUser'
import Button from '../../../components/UI/Button/Button'

export default function Revise () {
  const router = useRouter()
  const { folder } = router.query
  useUser({ redirectTo: '/auth' })
  const [flashcards, setFlashcards] = useState([])
  const [currCard, setCurrCard] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(async () => {
    if (!router.isReady) return
    const res = await axios.post('/folder/revise', { folderName: folder })
    setFlashcards(res.flashcards)
    setIsLoading(false)
  }, [router])

  const nextCardHandler = () => {
    if (currCard === flashcards.length - 1) {
      setIsFinished(true)
    } else {
      setCurrCard(currCard + 1)
    }
  }

  return !isLoading
    ? isFinished
      ? <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center space-y-6 my-6">
        <div className='font-bold text-3xl'>Finished revising {folder}!</div>
        <div className='w-auto'>
          <Button onClick={() => router.push('/')}>Return home</Button>
        </div>
      </div>
      : flashcards.length === 0
        ? <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center space-y-6 my-6">
          <div className='font-bold text-3xl'>No cards to revise for {folder} today!</div>
          <div className='w-auto'>
            <Button onClick={() => router.push('/')}>Return home</Button>
          </div>
        </div>
        : (
          <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center space-y-6 my-6">
            <div className='font-bold text-3xl'>Revising {folder}</div>
            <ReviseCard
              next={nextCardHandler}
              front={flashcards[currCard].front}
              back={flashcards[currCard].back}
              _id={flashcards[currCard]._id}
            />
          </div>
        )
    : <div className='loader'></div>
}
