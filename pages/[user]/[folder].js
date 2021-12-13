import { useState } from 'react'
import axios from '../../lib/axiosConfig'
import Router, { useRouter } from 'next/router'

import useSWR from 'swr'
import useFolders from '../../hooks/useFolders'
import NewFlashcard from '../../components/Forms/NewFlashcard'
import DisplayCard from '../../components/Flashcard/DisplayCard'
import FolderInfo from '../../components/Folder/FolderInfo'

export default function Folder () {
  const router = useRouter()
  const { folder: folderName, user: owner } = router.query
  const { folders, mutateFolders } = useFolders()
  const [isDeletingFolder, setIsDeletingFolder] = useState(false)
  const [isSavingCard, setIsSavingCard] = useState(false)

  const { data: folderData, mutate } = useSWR(
    router.isReady && `/folder/${owner}/${folderName}`,
    router.isReady && axios
  )

  const deleteFlashcardHandler = async (_id) => {
    const updatedFolder = { ...folderData }
    updatedFolder.flashcards = updatedFolder.flashcards.filter(
      (card) => card._id !== _id
    )
    mutate(updatedFolder, false)
    await axios.post('/flashcard/delete', { flashcardId: _id })
  }

  const deleteFolderHandler = () => {
    setIsDeletingFolder(true)
    mutateFolders(
      folders.filter((folder) => folder.name !== folderName),
      false
    )
    axios
      .post('/folder/delete', { folder: folderName })
      .then((res) => {
        Router.push('/')
      })
      .catch((err) => console.log(err))
  }

  const saveFlashcardHandler = async (isNew, values, resetForm) => {
    setIsSavingCard(true)
    const res = await axios.post('/folder/update', {
      folder: folderData.folder.name,
      flashcards: [{ front: values.front, back: values.back }]
    })
    const updatedFolder = { ...folderData }
    let updatedFlashcards
    if (isNew) { updatedFlashcards = updatedFolder.flashcards.concat(res.flashcards) }
    updatedFolder.flashcards = updatedFlashcards
    mutate(updatedFolder, false)
    setIsSavingCard(false)
    resetForm()
  }

  return folderData
    ? (
      <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center space-y-6 my-6">
        <FolderInfo name={folderData.folder.name} description={folderData.folder.description} deleteFolderHandler={deleteFolderHandler} isLoading={isDeletingFolder}/>
        <div className="flex space-x-2">
          <div className="bg-sky-200 w-full py-6 px-10 flex justify-between rounded-lg border-4 border-sky-700 mt-8">
            <NewFlashcard saveFlashcardHandler={saveFlashcardHandler} isLoading={isSavingCard} />
          </div>
        </div>
        <div className="w-full m-auto">
          {folderData.flashcards.map((card, i) => (
            <DisplayCard key={i} card={card} deleteFlashcardHandler={deleteFlashcardHandler}/>
          ))}
        </div>
      </div>
    )
    : (
      <div className="loader"></div>
    )
}
