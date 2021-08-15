import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Router from "next/router";

import { newFolderForm } from "../lib/yupSchemas";
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
    mutateUser({ ...user, folders: updatedFolders });
    Router.push(`/${user.username}/${values.folderName}`);
    console.log(values);
    axios.post("/folder/create", values);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (user)
    return (
      <>
        <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center">
          <p>This is the home page</p>
          <br />
          <p>Hello {user.username}</p>
          <br />
          {user.folders.length !== 0 ? (
            user.folders.map((folder, i) => (
              <p key={i}>
                {folder.name}: {folder.description}
              </p>
            ))
          ) : (
            <li>No folders yet</li>
          )}
          <br />
          <button onClick={() => setCreateFolder(true)}>ADD FOLDER</button>
        </div>
        <Modal
          show={createFolder}
          onClose={() => setCreateFolder(false)}
          folderAdd
          title="Create New Folder"
          buttons={false}
        >
          <Formik
            onSubmit={(values) => newFolderHandler(values)}
            initialValues={{ folderName: "", description: "" }}
            validationSchema={newFolderForm}
          >
            {({ errors, values, handleSubmit }) => (
              <Form className="flex flex-col space-y-2">
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Folder Name
                </p>
                <Field
                  name="folderName"
                  className={`shadow appearance-none border ${
                    errors.folderName
                      ? "border-red-500"
                      : "border-blue-chill-500"
                  } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                />
                <ErrorMessage
                  name="folderName"
                  render={(msg) => <p className="text-red-600">{msg}</p>}
                />
                <p className="block text-gray-700 text-sm font-bold mb-2">
                  Description (optional)
                </p>
                <Field
                  name="description"
                  type="textarea"
                  className={`shadow appearance-none border ${
                    errors.description
                      ? "border-red-500"
                      : "border-blue-chill-500"
                  } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                />
                <ErrorMessage name="description" component="div" />
                <div className="bg-gray-50 px-4 py-3 sm:space-y-2 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button main onClick={() => handleSubmit(values)}>
                    Submit
                  </Button>
                  <Button onClick={() => setCreateFolder(false)}>Cancel</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </>
    );
  return (
    <div>
      <div className="loader"></div>
    </div>
  );
}
