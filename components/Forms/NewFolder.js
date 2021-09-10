import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "../../components/UI/Button/Button";
import { newFolderFormSchema } from "../../lib/yupSchemas";

export default function NewFolderForm({ submitHandler, cancelHandler }) {
  return (
    <Formik
      onSubmit={(values) => submitHandler(values)}
      initialValues={{ folderName: "", description: "" }}
      validationSchema={newFolderFormSchema}
    >
      {({ errors, values, handleSubmit }) => (
        <Form className="flex flex-col space-y-2">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            Folder Name
          </p>
          <Field
            name="folderName"
            className={`shadow appearance-none border ${
              errors.folderName ? "border-red-500" : "border-blue-chill-500"
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
              errors.description ? "border-red-500" : "border-blue-chill-500"
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          />
          <ErrorMessage name="description" component="div" />
          <div className="bg-gray-50 px-4 py-3 sm:space-y-2 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button main onClick={() => handleSubmit(values)}>
              Submit
            </Button>
            <Button onClick={cancelHandler}>Cancel</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}