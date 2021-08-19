import { useState } from "react";
import Router from "next/router";
import { FolderOpenIcon, BookOpenIcon } from "@heroicons/react/outline";

import NewFolderForm from "../components/Forms/NewFolder";
import useUser from "../hooks/useUser";
import Modal from "../components/Modal/Modal";
import Button from "../components/UI/Button/Button";
import axios from "axios";

export default function Home() {
  const { user, mutateUser } = useUser({ redirectTo: "/auth" });
  const [createFolder, setCreateFolder] = useState(false);

  const newFolderHandler = (values) => {
    const updatedFolders = [...user.folders];
    const newFolder = {
      ...values,
      lastReview: new Date(),
      progress: [0, 0, 0, 0, 0],
    };
    updatedFolders.push(newFolder);
    mutateUser({ ...user, folders: updatedFolders }, false);
    Router.push(`/${user.username}/${values.folderName}`);
    axios.post("/folder/create", values);
  };

  if (user)
    return (
      <>
        <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center space-y-6 my-6">
          <p className="font-bold text-2xl mt-6">Hello {user.username}</p>
          <div className="flex flex-col content-center">
            {user.folders.length !== 0 ? (
              user.folders.map((folder, i) => (
                <div
                  key={i}
                  className="bg-blue-chill-400 sm:min-w-full p-2 my-6 flex m-auto shadow-md rounded-md mb-0 hover:bg-blue-chill-300 h-auto lg:w-3/5 py-4 px-3"
                >
                  <div className="ml-1">
                    <FolderOpenIcon
                      className="h-7 w-7  mr-2  cursor-pointer hover:text-gray-50"
                      onClick={() =>
                        Router.push(`${user.username}/${folder.name}`)
                      }
                    />
                    <BookOpenIcon
                      className="h-7 w-7  mr-2 cursor-pointer hover:text-gray-50"
                      onClick={() =>
                        Router.push(`${user.username}/revise/${folder.name}`)
                      }
                    />
                  </div>
                  <div className="flex flex-col text-left mx-1 min-w-auto">
                    <p className="font-semibold text-xl">{folder.name}</p>
                    <p className="text-lg">{folder.description}</p>
                  </div>
                  <p className="flex-grow my-auto">folder progress</p>
                </div>
              ))
            ) : (
              <p className="italic">No folders yet</p>
            )}
          </div>
          <div>
            <Button main onClick={() => setCreateFolder(true)}>
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
    );
  return (
    <div>
      <div className="loader"></div>
    </div>
  );
}
