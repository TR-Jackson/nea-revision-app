import { useState } from 'react'
import axios from '../../lib/axiosConfig'
import Router, { useRouter } from 'next/router'
import useSWR from 'swr'

import useFolders from '../../hooks/useFolders'
import NewFlashcard from '../../components/Forms/NewFlashcard'
import DisplayCard from '../../components/Flashcard/DisplayCard'
import FolderInfo from '../../components/Folder/FolderInfo'
import NewFolderForm from '../../components/Forms/NewFolder'
import Modal from '../../components/Modal/Modal'

export default function Folder () {
  const router = useRouter()
  const { folder: folderName, user: owner } = router.query
  const { folders, mutateFolders } = useFolders()
  const [isDeletingFolder, setIsDeletingFolder] = useState(false)
  const [isSavingCard, setIsSavingCard] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [modalError, setModalError] = useState()

  const { data: folderData, mutate } = useSWR(
    router.isReady && `/folder/${owner}/${folderName}`,
    router.isReady && axios
  )

  const editFolderHandler = (values) => {
    const changes = {}
    if (values.folderName !== folderData.folder.name) changes.newFolderName = values.folderName
    if (values.description !== folderData.folder.description) changes.description = values.description
    axios.post('/folder/edit', { folderName: folderData.folder.name, ...changes }).then(res => {
      const newFolderData = { ...folderData }
      newFolderData.folder.folderName = values.folderName
      newFolderData.folder.description = values.description
      mutate(newFolderData, false)
      router.push(`/${owner}/${values.folderName}`)
      setShowEdit(false)
    }).catch(err => {
      setModalError(err)
    })
  }

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
      <>
        <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial mt-1 space-y-10 text-center">
          <FolderInfo
            name={folderData.folder.name}
            description={folderData.folder.description}
            deleteFolderHandler={deleteFolderHandler}
            isLoading={isDeletingFolder}
            editFolderHandler={() => setShowEdit(true)}/>
          <div className="bg-sky-200 w-full py-6 px-10 flex justify-between rounded-lg border-4 border-sky-700 mt-8">
            <NewFlashcard
              saveFlashcardHandler={saveFlashcardHandler}
              isLoading={isSavingCard} />
          </div>
          <div className="w-full m-auto space-y-6 pb-10">
            {folderData.flashcards.map((card, i) => (
              <DisplayCard
                key={i}
                card={card}
                deleteFlashcardHandler={deleteFlashcardHandler}/>
            ))}
          </div>
        </div>
        <Modal
          show={showEdit} onClose={() => setShowEdit(false)}
          edit title="Edit folder"
        >
          <>
            <NewFolderForm
              initName={folderData.folder.name} initDesc={folderData.folder.description}
              submitHandler={editFolderHandler} cancelHandler={() => setShowEdit(false)}/>
            {modalError && (
              <div className="w-4/5 m-auto mt-6 text-center border border-red-600 bg-red-200 rounded-md p-4 shadow-md shadow-red-200">
                <p>{modalError}</p>
              </div>
            )}
          </>
        </Modal>
      </>
    )
    : (
      <div className="loader"></div>
    )
}
