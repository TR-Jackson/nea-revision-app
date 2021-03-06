import axios from '../../../lib/axiosConfig'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ReviseCard from '../../../components/Flashcard/ReviseCard'
import useUser from '../../../hooks/useUser'
import Button from '../../../components/UI/Button/Button'

// This is the page for revising a folder
export default function Revise () {
  const router = useRouter()
  const { folder } = router.query
  useUser({ redirectTo: '/auth' })
  const [flashcards, setFlashcards] = useState([])
  const [currCard, setCurrCard] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isFinished, setIsFinished] = useState(false)

  // Fetches the flashcards that need to be revised when the page loads
  useEffect(async () => {
    if (!router.isReady) return
    const res = await axios.post('/folder/revise', { folderName: folder })
    setFlashcards(res.flashcards)
    setIsLoading(false)
  }, [router])

  // Function to update the array of flashcards to be revised and update the pointer (currCard) which points to the flashcard being revised currently
  // Used by the ReviseCard component
  const nextCardHandler = (q) => {
    let updatedFlashcards = [...flashcards]
    if (q > 3) {
      updatedFlashcards = flashcards.filter((c, i) => i !== currCard)
      if (updatedFlashcards.length === 0) {
        setIsFinished(true)
      }
    }
    setFlashcards(updatedFlashcards)
    setCurrCard((currCard + 1) % updatedFlashcards.length)
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
              front={flashcards[currCard]?.front}
              back={flashcards[currCard]?.back}
              _id={flashcards[currCard]?._id}
            />
          </div>
        )
    : <div className='loader'></div>
}
