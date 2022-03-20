import * as yup from 'yup'

// All exports are yup objects/schemas which are used to validate forms or request bodies

export const newFolderFormSchema = yup.object().shape({
  description: yup.string().trim().max(280),
  folderName: yup
    .string().trim()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .matches(/^(\w|\s)+$/, 'No special characters allowed')
    .required('Required')
})

export const authFormSchema = yup.object().shape({
  username: yup
    .string().trim()
    .min(2, 'Too Short')
    .max(25, 'Too Long')
    .matches(/^(\w|\s)+$/, 'No special characters allowed')
    .required('Required'),
  password: yup.string().trim().min(8, 'Too Short').required('Required')
  // email: yup.string().trim().email("Invalid email").required("Required"),
})

export const flashcardFormSchema = yup.object().shape({
  front: yup
    .string().trim()
    .min(2, 'Too Short')
    .max(280, 'Too Long')
    .required('Required'),
  back: yup
    .string().trim()
    .min(2, 'Too Short')
    .max(280, 'Too Long')
    .required('Required')
})

export const reqAuthSchema = yup.object().shape({
  username: yup.string().trim().min(2).max(25).matches(/^(\w|\s)+$/).required(),
  password: yup.string().trim().min(8).required()
})

export const reqDeleteFlashcardSchema = yup.object().shape({
  flashcardId: yup.string().trim().length(24).required()
})

export const reqCreateFolderSchema = yup.object().shape({
  folderName: yup.string().trim().min(2).max(50).matches(/^(\w|\s)+$/).required(),
  description: yup.string().trim().max(280)
})

export const reqDeleteFolderSchema = yup.object().shape({
  folder: yup.string().trim().min(2).max(50).matches(/^(\w|\s)+$/).required()
})

export const reqUpdateFolderSchema = yup.object().shape({
  folder: yup.string().trim().min(2).max(50).matches(/^(\w|\s)+$/).required(),
  flashcards: yup.array().min(1).required()
})

export const reqReviseFolderSchema = yup.object().shape({
  folderName: yup.string().trim().min(2).max(50).matches(/^(\w|\s)+$/).required()
})

export const reqResponseFlashcardSchema = yup.object().shape({
  flashcardId: yup.string().trim().length(24).required(),
  q: yup.number().integer().min(0).max(5).required()
})

export const reqEditFolderSchema = yup.object().shape({
  folderName: yup.string().trim().min(2).max(50).matches(/^(\w|\s)+$/).required(),
  newFolderName: yup.string().trim().min(2).max(50).matches(/^(\w|\s)+$/),
  description: yup.string().trim().max(280)
})
