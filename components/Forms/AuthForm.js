import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "../../components/UI/Button/Button";
import { authFormSchema } from "../../lib/yupSchemas";

export default function AuthForm({ submitHandler }) {
  return (
    <Formik
      onSubmit={(values) => {
        submitHandler(values);
      }}
      initialValues={{ username: "", password: "" }}
      validationSchema={authFormSchema}
    >
      {({ errors, values, handleSubmit }) => (
        <Form className="flex flex-col space-y-6">
          <div>
            <p className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </p>
            <Field
              name="username"
              className={`shadow appearance-none border ${
                errors.username ? "border-red-500" : "border-blue-chill-500"
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            />
            <ErrorMessage
              name="username"
              render={(msg) => <p className="text-red-600">{msg}</p>}
            />
          </div>
          <div>
            <p className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </p>
            <Field
              name="password"
              type="password"
              className={`shadow appearance-none border ${
                errors.password ? "border-red-500" : "border-blue-chill-500"
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            />
            <ErrorMessage
              name="password"
              render={(msg) => <p className="text-red-600">{msg}</p>}
            />
          </div>
          <div>
            <Button main onClick={() => handleSubmit(values)}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
