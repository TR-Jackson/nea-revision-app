import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { newFolderForm } from "../lib/yupSchemas";
import useUser from "../hooks/useUser";
import Modal from "../components/Modal/Modal";
import Button from "../components/UI/Button";

export default function Home() {
  const { user, mutateUser } = useUser({ redirectTo: "/auth" });
  const [createFolder, setCreateFolder] = useState(false);

  const newFolderHandler = (values) => {
    console.log(values);
    setCreateFolder(false);
  };
  if (user)
    return (
      <>
        <div className="flex flex-col justify-center w-2/3 mx-auto flex-initial text-center">
          <p>This is the home page</p>
          <br />
          <ul>
            <li>Hello {user.username}</li>
            {user.folders.length !== 0 ? (
              user.folders.map((folder, i) => <p key={i}>{folder}</p>)
            ) : (
              <li>No folders yet</li>
            )}
          </ul>
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
      <p>Loading...</p>
    </div>
  );
}
