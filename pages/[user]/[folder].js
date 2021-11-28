import { useState } from "react";
import axios from "../../lib/axiosConfig";
import Router from "next/router";
import { useRouter } from "next/router";
import useSWR from "swr";
import useFolders from "../../hooks/useFolders";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

import Button from "../../components/UI/Button/Button";
import { flashcardFormSchema } from "../../lib/yupSchemas";

export default function Folder() {
  const router = useRouter();
  const { folder: folderName, user: owner } = router.query;
  const { folders, mutateFolders } = useFolders();
  const [isLoading, setIsLoading] = useState(false);

  const { data: folderData, mutate } = useSWR(
    router.isReady && `/folder/${owner}/${folderName}`,
    router.isReady && axios
  );

  const deleteFlashcardHandler = async (_id) => {
    const updatedFolder = { ...folderData };
    updatedFolder.flashcards = updatedFolder.flashcards.filter(
      (card) => card._id !== _id
    );
    mutate(updatedFolder, false);
    await axios.post("/flashcard/delete", { flashcardId: _id });
  };

  const deleteFolderHandler = () => {
    setIsLoading(true);
    mutateFolders(
      folders.filter((folder) => folder.name !== folderName),
      false
    );
    axios
      .post("/folder/delete", { folderName: folderName })
      .then((res) => {
        Router.push("/");
      })
      .catch((err) => console.log(err));
  };

  const saveFlashcardHandler = async (isNew, values) => {
    setIsLoading(true);
    const res = await axios.post("/folder/update", {
      folder: folderData.folder.name,
      flashcards: [{ front: values.front, back: values.back }],
    });
    const updatedFolder = { ...folderData };
    let updatedFlashcards;
    if (isNew)
      updatedFlashcards = updatedFolder.flashcards.concat(res.flashcards);
    updatedFolder.flashcards = updatedFlashcards;
    mutate(updatedFolder, false);
    setIsLoading(false);
  };

  return folderData ? (
    <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center space-y-6 my-6">
      <title>Revision App - {folderName}</title>
      <div className="flex bg-blue-chill-200 rounded-md p-5 w-3/4 mx-auto shadow-md">
        <div className="flex flex-col flex-grow justify-center font-semibold text-lg space-y-2">
          <p className="text-4xl font-bold">{folderData.folder.name}</p>
          <p className="text-2xl">{folderData.folder.description}</p>
        </div>
        <div className="flex flex-col space-y-4 mx-2">
          <Button danger onClick={deleteFolderHandler}>
            DELETE FOLDER
          </Button>
          <Button main onClick={() => alert("edit")}>
            EDIT FOLDER
          </Button>
        </div>
      </div>
      <div className="w-full m-auto">
        {folderData.flashcards.map((card, i) => (
          <div key={i} className="flex my-6 text-lg">
            <div className="bg-blue-chill-400 w-full py-11 px-10 grid grid-cols-2 gap-4 space-x-6 items-center rounded-l-lg divide-x divide-blue-chill-600 mx-auto">
              <p>{card.front}</p>
              <p>{card.back}</p>
            </div>
            <div className="bg-blue-chill-600 m-auto h-32 px-2 rounded-r-lg">
              <div className="flex flex-col justify-evenly h-full">
                <PencilAltIcon className="h-9 w-9 cursor-pointer hover:text-blue-chill-50" />
                <TrashIcon
                  className="h-9 w-9 cursor-pointer hover:text-blue-chill-50"
                  onClick={() => deleteFlashcardHandler(card._id)}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex space-x-2">
          <div className="bg-blue-chill-200 w-full py-6 px-10 flex justify-between rounded-lg border-4 border-blue-chill-700 mt-8">
            <Formik
              initialValues={{ front: "", back: " " }}
              validationSchema={flashcardFormSchema}
              onSubmit={(values) => saveFlashcardHandler(true, values)}
            >
              {({ handleSubmit, errors, values }) => (
                <Form className="w-full flex justify-between items-center content-center font-semibold mx-10">
                  <p className="text-xl">Add a new card</p>
                  <div>
                    <p>Front</p>
                    <Field
                      name="front"
                      type="front"
                      className={`shadow appearance-none border ${
                        errors.front
                          ? "border-red-500"
                          : "border-blue-chill-500"
                      } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                    />
                    <ErrorMessage
                      name="front"
                      render={(msg) => <p className="text-red-600">{msg}</p>}
                    />
                  </div>
                  <div>
                    <p>Back</p>
                    <Field
                      name="back"
                      type="back"
                      className={`shadow appearance-none border ${
                        errors.back ? "border-red-500" : "border-blue-chill-500"
                      } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                    />
                    <ErrorMessage
                      name="back"
                      render={(msg) => <p className="text-red-600">{msg}</p>}
                    />
                  </div>
                  <div className="w-auto self-center">
                    <Button main onClick={() => handleSubmit(values)}>
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {isLoading && <div className="spinner"></div>}
    </div>
  ) : (
    <div className="loader"></div>
  );
}
