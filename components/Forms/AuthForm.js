import { Formik, Form, Field, ErrorMessage } from 'formik'
import PropTypes from 'prop-types'

import { trimObj } from '../../util/forms'
import Button from '../../components/UI/Button/Button'
import { authFormSchema } from '../../lib/yupSchemas'

export default function AuthForm ({ submitHandler }) {
  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        submitHandler(trimObj(values))
        resetForm()
      }}
      initialValues={{ username: '', password: '' }}
      validationSchema={authFormSchema}
    >
      {({ errors, values, handleSubmit, isSubmitting, isValid, touched }) => (
        <Form className="flex flex-col space-y-6">
          <div>
            <p className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </p>
            <Field
              name="username"
              className={`shadow appearance-none border ${
                errors.username && touched.username ? 'border-red-500' : 'border-sky-500'
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
                errors.password && touched.password ? 'border-red-500' : 'border-sky-500'
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            />
            <ErrorMessage
              name="password"
              render={(msg) => <p className="text-red-600">{msg}</p>}
            />
          </div>
          <div>
            <Button
              isLoading={isSubmitting}
              disabled={!isValid}
              main
              onClick={() => handleSubmit(values)}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

AuthForm.propTypes = {
  submitHandler: PropTypes.func
}
