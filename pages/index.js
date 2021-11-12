import { useEffect, useState } from "react";
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
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const newFolderHandler = (values) => {
    const updatedFolders = [...folders];
    const newFolder = {
      name: values.folderName,
      description: values.description,
      lastReview: new Date(),
      boxStatus: [0, 0, 0, 0, 0],
      isPrivate: true,
    };
    updatedFolders.push(newFolder);
    setFolders(updatedFolders);
    Router.push(`/${user.username}/${values.folderName}`);
    axios.post("/folder/create", values);
  };

  useEffect(() => {
    axios.get("/folder/retrieve").then((res) => {
      setFolders(res.data.folders);
      setIsLoading(false);
    });
  }, []);

  if (user && !isLoading)
    return (
      <>
        <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center space-y-6 my-6">
          <p className="font-bold text-2xl mt-6">Hello {user.username}</p>
          <div className="flex flex-col content-center">
            {folders?.length !== 0 ? (
              folders.map((folder, i) => (
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
                  <p className="flex-grow flex my-auto justify-end space-x-4 pr-6">
                    {folder.boxStatus.map((count, i) => (
                      <p key={i}>{count}</p>
                    ))}
                  </p>
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
