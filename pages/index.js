import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from '../lib/axiosConfig'
import useFolders from '../hooks/useFolders'

import NewFolderForm from '../components/Forms/NewFolder'
import useUser from '../hooks/useUser'
import Modal from '../components/Modal/Modal'
import Button from '../components/UI/Button/Button'
import Folder from '../components/Folder/Folder'

export default function Home () {
  const router = useRouter()
  const { user } = useUser({ redirectTo: '/auth' })
  const { folders, mutateFolders } = useFolders()
  const [createFolder, setCreateFolder] = useState(false)

  const newFolderHandler = async (values) => {
    const updatedFolders = [...folders]
    const newFolder = {
      name: values.folderName,
      description: values.description,
      lastReview: new Date(),
      boxStatus: [0, 0, 0, 0, 0],
      isPrivate: true
    }
    updatedFolders.push(newFolder)
    mutateFolders(updatedFolders, false)
    await axios.post('/folder/create', values)
    router.push(`/${user.username}/${values.folderName}`)
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
          <div className="flex flex-col content-center">
            {folders.length !== 0
              ? (
                folders.map((folder, i) => (
                  <Folder
                    key={i}
                    name={folder.name}
                    description={folder.description}
                    boxStatus={folder.boxStatus}
                    openFolderHandler={openFolderHandler} />
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
          onClose={() => setCreateFolder(false)}
          folderAdd
          title="Create New Folder"
          buttons={false}
        >
          <NewFolderForm
            submitHandler={newFolderHandler}
            cancelHandler={() => setCreateFolder(false)}
          />
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
