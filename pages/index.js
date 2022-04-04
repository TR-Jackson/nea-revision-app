import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from '../lib/axiosConfig'
import useFolders from '../hooks/useFolders'

import NewFolderForm from '../components/Forms/NewFolder'
import useUser from '../hooks/useUser'
import Modal from '../components/Modal/Modal'
import Button from '../components/UI/Button/Button'
import Folder from '../components/Folder/Folder'

// This is the home page
// Displays the list of the user's folders
export default function Home () {
  const router = useRouter()
  const { user } = useUser({ redirectTo: '/auth' })
  const { folders, mutateFolders } = useFolders()
  const [createFolder, setCreateFolder] = useState(false)
  const [formError, setFormError] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)

  const modalCloseHandler = () => {
    setCreateFolder(false)
    setFormError(false)
  }

  const newFolderHandler = async (values) => {
    setIsLoadingCreate(true)
    const updatedFolders = [...folders]
    const newFolder = {
      name: values.folderName,
      description: values.description,
      nextReview: new Date(),
      revisedStatus: [0, 0, 0, 0, 0, 0],
      isPrivate: true
    }
    updatedFolders.push(newFolder)
    axios.post('/folder/create', values).then(res => {
      mutateFolders(updatedFolders, false)
      router.push(`/${user.username}/${values.folderName}`)
    }).catch(err => {
      setFormError(err.response.data.message)
    })
  }

  const openFolderHandler = (folderName, isRevise) => {
    router.push(`${user.username}/${isRevise ? 'revise/' : ''}${folderName}`)
  }

  if (user && folders) {
    return (
      <>
        <title>Revision App</title>
        <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center space-y-6 my-6">
          <p className="font-bold text-2xl mt-6">Hello {user.username}</p>
          <div className="flex flex-col content-center space-y-4">
            {folders.length !== 0
              ? (
                folders.map((folder, i) => (
                  <Folder
                    key={i}
                    name={folder.name}
                    description={folder.description}
                    revisedStatus={folder.revisedStatus}
                    openFolderHandler={openFolderHandler}
                    toRevise={(new Date(folder.nextReview) <= new Date(Math.floor(Date.now() / 86400000) * 86400000) && folder.revisedStatus.some(i => i !== 0))} />
                ))
              )
              : (
                <p className="italic">No folders yet</p>
              )}
          </div>
          <div>
            <Button
              main
              onClick={() => setCreateFolder(true)}>
              ADD FOLDER
            </Button>
          </div>
        </div>
        <Modal
          show={createFolder}
          onClose={modalCloseHandler}
          folderAdd
          title="Create New Folder"
          buttons={false}
        >
          <NewFolderForm
            isLoading={isLoadingCreate}
            submitHandler={newFolderHandler}
            cancelHandler={modalCloseHandler}
          />
          {formError && (
            <div className="w-4/5 m-auto mt-6 text-center border border-red-600 bg-red-200 rounded-md p-4 shadow-md shadow-red-200">
              <p>{formError}</p>
            </div>
          )}
        </Modal>
      </>
    )
  }
  return (
    <div>
      <div className="loader"></div>
    </div>
  )
}
