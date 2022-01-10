import PropTypes from 'prop-types'

import { flashcardFormSchema } from '../../lib/yupSchemas'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from '../UI/Button/Button'

export default function NewFlashcard ({ saveFlashcardHandler, isLoading }) {
  return (
    <Formik
      initialValues={{ front: '', back: ' ' }}
      validationSchema={flashcardFormSchema}
      onSubmit={(values, { resetForm }) =>
        saveFlashcardHandler(true, values, resetForm)
      }
    >
      {({ handleSubmit, errors, values }) => (
        <Form className="w-full flex md:flex-row flex-col justify-between items-center content-center font-semibold mx-10">
          <p className="text-xl">Add a new card</p>
          <div>
            <p>Front</p>
            <Field
              as="textarea"
              name="front"
              type="front"
              className={`shadow appearance-none border ${
                errors.front
                  ? 'border-red-500'
                  : 'border-sky-500'
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
              as="textarea"
              name="back"
              type="back"
              className={`shadow appearance-none border ${
                errors.back ? 'border-red-500' : 'border-sky-500'
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            />
            <ErrorMessage
              name="back"
              render={(msg) => <p className="text-red-600">{msg}</p>}
            />
          </div>
          <div className="w-auto self-center">
            <Button
              main
              onClick={() => handleSubmit(values)}
              isLoading={isLoading}>
                      Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

NewFlashcard.propTypes = {
  saveFlashcardHandler: PropTypes.func,
  isLoading: PropTypes.bool
}
